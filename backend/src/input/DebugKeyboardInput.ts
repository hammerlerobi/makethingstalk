import { IInputDevice } from "./IInputDevice";
import  readline from 'readline';
import { IInteractionMessage } from "../transmitters/IInteractionMessage";
import { ITransmitter } from "../transmitters/ITransmitter";



class DebugKeyboardInput implements IInputDevice {
    transmitters: ITransmitter[];
    keymap:any[];

    constructor() {

        this.keymap = [{name:"1",enabled:false},
                        {name:"2",enabled:false},
                        {name:"3",enabled:false}
                      ]

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (key, data) => {
        if (key && key.ctrl && key.name === 'c') process.exit();
        const element = this.keymap.find( e => e.name === data.name );
        element.enabled = !element.enabled;
        if(element.enabled){
            this.send({
                command: "NewTAG",
                media: "",
                tagID: element.name,
            });
        }else{
            this.send({
                command: "Idle",
                media: "",
                tagID: "",
              });
        }
    });
    }

    bindTransmitters(transmitters:ITransmitter[]): void {
        this.transmitters = transmitters;
    }
    send(message: IInteractionMessage): void {
        this.transmitters.forEach((transmitter) => {
            transmitter.sendMessage(message);
          });
    }
}
export { DebugKeyboardInput };
