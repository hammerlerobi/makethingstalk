import { IInputDevice } from "./IInputDevice";
import { IInteractionMessage, TagCommand } from "../transmitters/IInteractionMessage";
import { ITransmitter } from "../transmitters/ITransmitter";

// is used to trigger server side messages
// for example when a tag is linked we send a play command for the linked media.
// singleton pattern

  class ServerSidedInput implements IInputDevice {
    private static instance: ServerSidedInput;
    transmitters: ITransmitter[];
    private constructor() {
    }

    public static getInstance(): ServerSidedInput {
        if (!ServerSidedInput.instance) {
            ServerSidedInput.instance = new ServerSidedInput();
        }
        return ServerSidedInput.instance;
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
export { ServerSidedInput };
