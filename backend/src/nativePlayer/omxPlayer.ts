import { ITransmitter } from "../transmitters/ITransmitter";
import { IInteractionMessage } from "../transmitters/IInteractionMessage";
import omxp from "omxplayer-controll";
import {getResolution,PROJECT_DIR } from "../settings";

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
	    'alpha':1, // must be 1 zero does not work
        'startVolume': 0.8 ,// 0.0 ... 1.0 default: 1.0
        'win': this.generateWindowSetting() // must be set otherwise alpha is not working
    };

    generateWindowSetting():string{
        let setting = "0 0 ";
        const res = getResolution();
        setting = setting.concat(res[0].toString()," ",res[1].toString())
        console.log("Starting OMX with " +setting);
        return setting;
    }
    // we use the transmitter interface so that we can simply add the omxplayer to the transmitter array
    sendMessage(message: IInteractionMessage): void {
        if(message.command === "Play"){
            if(this.playing){
                this.currentAlpha=0;
                omxp.setAlpha(this.currentAlpha, (err:Error)=>{console.log(err)});
                omxp.stop((err:any)=>{console.log(err)});
            }
            // path for some reason must be absolute
            omxp.open(PROJECT_DIR+"/../uploads/"+message.media, this.opts);
            this.playing = true;
            setTimeout(this.fadeIn.bind(this),1000); // give omx some time to load should later be realized with a ready callback
        }
        if(message.command === "Idle" && this.playing){
            // path for some reason must be absolute
            this.playing = false;
            this.fadeOut();
        }
    }

    fadeIn():void{
        if(this.currentAlpha < 255 && this.playing){
            omxp.setAlpha(this.currentAlpha, (err:Error)=>{console.log(err)});
            this.currentAlpha += this.fadeSpeed;
            process.nextTick(this.fadeIn.bind(this));
            this.currentAlpha = Math.min(this.currentAlpha,255);
        }
    }

    fadeOut():void{
        if(this.currentAlpha > 0){
            omxp.setAlpha(this.currentAlpha, (err:any)=>{console.log(err)});
            this.currentAlpha -= this.fadeSpeed;
            process.nextTick(this.fadeOut.bind(this));
            this.currentAlpha = Math.max(this.currentAlpha,0);
        }else{
            omxp.stop((err:any)=>{console.log(err)});
        }
    }
}

export { OmxPlayer };



