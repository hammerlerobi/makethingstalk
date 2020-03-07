import express from 'express';
import bodyParser from 'body-parser';
import {UploadRoutes} from './routes/uploadRoutes';
import {DataBase,Tag,Media} from './db';
import { cachedDataVersionTag } from 'v8';


class App {
	public app: express.Application;
	public db : DataBase;
	constructor() {
		this.app = express();
		this.config();
		this.allRoutes();
		this.db = new DataBase();
		// Test adding a tag
		const tag:Tag = {id : "HelloTag"};
		this.db.AddTag(tag);
	}
	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));
	}

	private allRoutes(): void {
		this.app.use("/upload", UploadRoutes);
	}


}

export default new App().app;