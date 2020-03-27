import Mfrc522 from "mfrc522-rpi";
import SoftSPI from "rpi-softspi";
import {ITransmitter, IInteraktionMessage} from "../transmitters/ITransmitter";
import {IInputDevice} from "./IInputDevice";

class ReaderRFID implements IInputDevice{
	reader : Mfrc522;
	transmitters : ITransmitter[];
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
	  }

	  bindTransmitters(transmitters:ITransmitter[]){
		this.transmitters = transmitters;
	  }

	  send(message:IInteraktionMessage){
		this.transmitters.forEach(transmitter => {
			transmitter.sendMessage(message);
		});
	  }


	readLoop():void{
		setInterval(function() {
			// # reset card
			this.reader.reset();

			// # Scan for cards
			let response = this.reader.findCard();
			if (!response.status) {
			  console.log("No Card");
			  return;
			}
			console.log("Card detected, CardType: " + response.bitSize);
			this.send({message:"Card found"});
			// # Get the UID of the card
			response = this.reader.getUid();
			if (!response.status) {
			  console.log("UID Scan Error");
			  return;
			}
			// # If we have the UID, continue
			const uid = response.data;
			console.log(
			  "Card read UID: %s %s %s %s",
			  uid[0].toString(16),
			  uid[1].toString(16),
			  uid[2].toString(16),
			  uid[3].toString(16)
			);

			// # Select the scanned card
			const memoryCapacity = this.mfrc522.selectCard(uid);
			console.log("Card Memory Capacity: " + memoryCapacity);

			// # This is the default key for authentication
			const key = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];

			// # Authenticate on Block 8 with key and uid
			if (!this.mfrc522.authenticate(8, key, uid)) {
			  console.log("Authentication Error");
			  return;
			}

			// # Dump Block 8
			console.log("Block: 8 Data: " + this.mfrc522.getDataForBlock(8));

			// # Stop
			this.reader.stopCrypto();
		  }, 500);
	}
}
export {
	ReaderRFID as ReaderRFID,
};