import Mfrc522 from "mfrc522-rpi";
import SoftSPI from "rpi-softspi";
import {ITransmitter} from "../transmitters/ITransmitter";
import {IInteractionMessage} from "../transmitters/IInteractionMessage";
import {IInputDevice} from "./IInputDevice";
import app from '../app';

class ReaderRFID implements IInputDevice{
	reader : Mfrc522;
	transmitters : ITransmitter[];
	lastReadTag : String ="";
	noCardPresentCount : number = 0;

	softSPI = new SoftSPI({
		clock: 23, // pin number of SCLK
		mosi: 19, // pin number of MOSI
		miso: 21, // pin number of MISO
		client: 24 // pin number of CS
	  });

	  constructor() {
		this.reader = new Mfrc522(this.softSPI);
		this.reader.setBuzzerPin(18);
		this.reader.setResetPin(22);
		this.readLoop();
	  }

	  bindTransmitters(transmitters:ITransmitter[]){
		this.transmitters = transmitters;
	  }

	  send(message:IInteractionMessage){
		this.transmitters.forEach(transmitter => {
			transmitter.sendMessage(message);
		});
	  }

	  read(){
		const reader = this.reader;
		reader.reset();

			// # Scan for cards
			let response = reader.findCard();
			if (!response.status) {
			  this.noCardPresentCount++;
			  if(this.noCardPresentCount>2){
				this.send({command:"Idle",media:"",tagID:""});
				this.lastReadTag="";
				console.log("Card Left");
			  }
			  return;
			}
			console.log("Card detected, CardType: " + response.bitSize);
			// # Get the UID of the card
			response = reader.getUid();
			if (!response.status) {
			  console.log("UID Scan Error");
			  return;
			}


			this.noCardPresentCount = 0;
			// # If we have the UID, continue
			let uid = response.data;
			
			uid[0].toString(16);
			uid[1].toString(16);
			uid[2].toString(16); 
			uid[3].toString(16);
			let uidString = uid.map(String)
			let adress =  uidString.join('-');

			if(this.lastReadTag !== adress){
				// Adresse change so new TAG is present
				// make lookup in db 
				app.db.GetTag(adress)
				.then(result => {
					if(result.medias)
						this.send({command:"Play",media:result.medias[0],tagID:result.id})
					else
						this.send({command:"NewTAG",media:"",tagID:result.id})	
				})
				.catch(()=>{
					this.send({command:"NewTAG",media:"",tagID:adress})	
				})				
			}
			this.reader.stopCrypto();
	  }

	readLoop():void{
		setInterval( () => this.read(), 500);
	}
}
export {
	ReaderRFID as ReaderRFID,
};