import express from 'express';
import bodyParser from 'body-parser';
import {UploadRoutes} from './routes/UploadRoutes';

class App {
	public app: express.Application;
	constructor() {
		this.app = express();
		this.config();
		this.allRoutes();
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