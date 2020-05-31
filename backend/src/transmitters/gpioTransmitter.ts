import { ITransmitter } from "./ITransmitter";
import { IInteractionMessage, TagCommand } from "./IInteractionMessage";
import { Gpio } from "onoff";

class GpioTransmitter implements ITransmitter {

  private pin26: Gpio;

  constructor() {
    this.pin26 = new Gpio(26, 'out');
  }

  public sendMessage(message: IInteractionMessage): void {
    switch(message.command){
      case TagCommand.idle:
        this.pin26.write(0);
      break;
      case TagCommand.new:
        this.pin26.write(1);
      break;
      case TagCommand.play:
        this.pin26.write(1);
      break;
    }
  }
}

export { GpioTransmitter };
