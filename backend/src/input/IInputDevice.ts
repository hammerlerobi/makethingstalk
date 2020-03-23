import { ITransmitter, IInteraktionMessage } from "../transmitters/ITransmitter";

interface IInputDevice {
	transmitters : ITransmitter[];
	bindTransmitters (transmitters :ITransmitter[]):void;
	send (message:IInteraktionMessage):void;
}
export {
	IInputDevice as IInputDevice,
};