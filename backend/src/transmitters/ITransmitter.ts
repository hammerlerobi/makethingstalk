// Define a generic interface maybe we want different transmitters and Messages in the future

interface IInteraktionMessage {
	command: string
}

interface ITransmitter {
	sendMessage (message: IInteraktionMessage):void;
}

export {
	IInteraktionMessage as IInteraktionMessage,
	ITransmitter as ITransmitter
};