import express from 'express';
import bodyParser from 'body-parser';
import {DataBase} from './db';
import { MediaRoutes } from './routes/mediaRoutes';
import {UploadRoutes} from './routes/uploadRoutes';
import {TagRoutes} from './routes/tagRoutes';
import {WebsocketTransmitter} from './transmitters/websocketTransmitter';
import { ITransmitter } from './transmitters/ITransmitter';




class App {
	public express: express.Application;
	public db : DataBase;
	public transmitters : ITransmitter[];
	constructor() {
		this.express = express();
		this.config();
		this.allRoutes();
		this.db = new DataBase();
		this.transmitters.push(new WebsocketTransmitter());
	}
	private config(): void {
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({
			extended: true
		}));
	}

	private allRoutes(): void {
		this.express.use("/upload", UploadRoutes);
		this.express.use("/tag", TagRoutes);
		this.express.use("/media", MediaRoutes);
	}
}
export default new App();
