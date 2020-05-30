import SerialPort from 'serialport';
import { ITransmitter } from "./ITransmitter";
import { IInteractionMessage, TagCommand } from "./IInteractionMessage";

class SerialTransmitter implements ITransmitter {
  private port: SerialPort;

  constructor() {
    this.port = new SerialPort('/dev/cu.usbmodem141201', {
      baudRate: 19200
    });
  }

  public sendMessage(message: IInteractionMessage): void {
    console.log("Serial " + message.command);
    this.port.write(message.command + "\n", (err) => {
      if (err) {
        return console.log('Error on serial write: ', err.message)
      }
    })
  }
}

export { SerialTransmitter };
