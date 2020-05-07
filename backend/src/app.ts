import express from 'express';
import bodyParser from 'body-parser';
import {DataBase} from './db';
import { MediaRoutes } from './routes/mediaRoutes';
import {UploadRoutes} from './routes/uploadRoutes';
import {TagRoutes} from './routes/tagRoutes';
import {WebsocketTransmitter} from './transmitters/websocketTransmitter';
import {OmxPlayer} from './nativePlayer/omxPlayer';
import { ITransmitter } from './transmitters/ITransmitter';
import { IInputDevice } from './input/IInputDevice';
import { ReaderRFID } from './input/ReaderRFID';




class App {
	public express: express.Application;
	public db : DataBase;
	public transmitters : ITransmitter[] = new Array<ITransmitter>();
	public inputDevices : IInputDevice[] = new Array<IInputDevice>();
	constructor() {
		this.express = express();
		this.config();
		this.allRoutes();
		this.db = new DataBase();
		this.transmitters.push(new WebsocketTransmitter());
		this.transmitters.push(new OmxPlayer());
		this.inputDevices.push(new ReaderRFID());
		this.bindTransmittersToInputs();
	}

	private bindTransmittersToInputs():void{
		this.inputDevices.forEach(inputDevice => {
			inputDevice.bindTransmitters(this.transmitters);
		});
	}

	private config(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({
			extended: false
		}));
	}

	private allRoutes(): void {
		// add static routes for player
		this.express.use('/player', express.static('../player/'));
		this.express.use('/media', express.static('./uploads/'));
		this.express.use('/', express.static('../frontend/build/'));
		this.express.use('/api/media', MediaRoutes);
		this.express.use('/api/upload', UploadRoutes);
		this.express.use('/api/tag', TagRoutes);

	}
}
export default new App();
