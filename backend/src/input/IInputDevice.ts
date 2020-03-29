import { ITransmitter } from "../transmitters/ITransmitter";
import { IInteractionMessage } from "../transmitters/IInteractionMessage";

interface IInputDevice {
	transmitters : ITransmitter[];
	bindTransmitters (transmitters :ITransmitter[]):void;
	send (message:IInteractionMessage):void;
}
export {
	IInputDevice as IInputDevice,
};