import express from 'express';
import bodyParser from 'body-parser';
import {DataBase} from './db';
import { MediaRoutes } from './routes/mediaRoutes';
import {UploadRoutes} from './routes/uploadRoutes';
import {TagRoutes} from './routes/tagRoutes';




class App {
	public express: express.Application;
	public db : DataBase;
	constructor() {
		this.express = express();
		this.config();
		this.allRoutes();
		this.db = new DataBase();
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
