import { ITransmitter } from "../transmitters/ITransmitter";
import { IInteractionMessage } from "../transmitters/IInteractionMessage";
import omxp from "omxplayer-controll";

class OmxPlayer implements ITransmitter {
    opts = {
        'audioOutput': 'hdmi', //  'hdmi' | 'local' | 'both'
        'blackBackground': false, //false | true | default: true
        'disableKeys': true, //false | true | default: false
        'disableOnScreenDisplay': true, //false | true | default: false
        'disableGhostbox': true, //false | true | default: false
        'subtitlePath': '', //default: ""
        'startAt': 0, //default: 0
        'startVolume': 0.8 //0.0 ... 1.0 default: 1.0
    };


    //we use the transmitter interface so that we can simply add the omxplayer to the array
    sendMessage(message: IInteractionMessage): void {
        omxp.open('path_to_file', this.opts);
    }    
}



