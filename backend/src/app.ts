import express from 'express';
import bodyParser from 'body-parser';
import {UploadRoutes} from './routes/uploadRoutes';
import {TagRoutes} from './routes/tagRoutes';
import {DataBase,Tag,Media} from './db';
import { cachedDataVersionTag } from 'v8';


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
	}
}
export default new App();
