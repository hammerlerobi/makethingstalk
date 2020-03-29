import {IInteractionMessage} from './IInteractionMessage';
// Define a generic interface maybe we want different transmitters and Messages in the future


interface ITransmitter {
	sendMessage (message: IInteractionMessage):void;
}

export {
	ITransmitter as ITransmitter
};