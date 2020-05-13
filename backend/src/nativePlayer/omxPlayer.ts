import { ITransmitter } from "../transmitters/ITransmitter";
import { IInteractionMessage } from "../transmitters/IInteractionMessage";
import omxp from "omxplayer-controll";
import {CURRENT_RESOLUTION,PROJECT_DIR } from "../settings";

class OmxPlayer implements ITransmitter {
    currentAlpha = 0 ;
    fadeSpeed = 5;
    playing= false;

    opts = {
        'audioOutput': 'hdmi', //  'hdmi' | 'local' | 'both'
        'blackBackground': false, // false | true | default: true
        'disableKeys': true, // false | true | default: false
        'disableOnScreenDisplay': true, // false | true | default: false
        'disableGhostbox': true, // false | true | default: false
        'subtitlePath': '', // default: ""
        'startAt': 0, // default: 0
        'startVolume': 0.8 ,// 0.0 ... 1.0 default: 1.0
        'win':`0 0 CURRENT_RESOLUTION[0] CURRENT_RESOLUTION[1]`
    };

    // we use the transmitter interface so that we can simply add the omxplayer to the transmitter array
    sendMessage(message: IInteractionMessage): void {
        if(message.command === "Play"){
            // path for some reason must be absolute
            omxp.open(PROJECT_DIR+"/../uploads/"+message.media, this.opts);
            this.playing = true;
            setTimeout(this.fadeIn,5000);
        }
        if(message.command === "idle"){
            // path for some reason must be absolute
            this.playing = false;
            this.fadeOut();
        }
    }

    fadeIn():void{
        if(this.currentAlpha < 255 && this.playing){
            omxp.setAlpha(this.currentAlpha, (err:Error)=>{console.log(err)});
            this.currentAlpha += this.fadeSpeed;
            process.nextTick(this.fadeIn);
            this.currentAlpha = Math.min(this.currentAlpha,255);
        }
    }

    fadeOut():void{
        if(this.currentAlpha > 0){
            omxp.setAlpha(this.currentAlpha, (err:Error)=>{console.log(err)});
            this.currentAlpha -= this.fadeSpeed;
            process.nextTick(this.fadeIn);
            this.currentAlpha = Math.max(this.currentAlpha,0);
        }else{
            omxp.stop();
        }
    }
}

export { OmxPlayer };



