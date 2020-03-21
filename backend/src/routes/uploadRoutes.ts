import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import app from '../app';
import {Media} from '../db';
import sanitize from 'sanitize-filename';
import shortid from 'shortid';

const router = express.Router();
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/')
	},
	filename(req: Express.Request, file: Express.Multer.File, cb: any) {
		const cleanFilename = sanitize(file.originalname);
		cb(null, cleanFilename)
	}
});
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype === "video/mp4") {
		const exists = app.db.MediaExists(file.originalname);
		exists.then(value => {
			console.log('resolved', value);
		});
		exists.catch(error => {
			console.log('rejected', error);
		});
		cb(null, true);
	} else {
		cb(new Error("Currently only MP4 video files are supported"), false);
	}
}

const upload = multer({
	storage,
	fileFilter
});

router.post('/', upload.array('files', 5), async (req: Request,
	res: Response, next: NextFunction) => {
	const files = req.files as Express.Multer.File[];
	files.forEach(file => {
		const media: Media = {
			id: shortid.generate(),
			name: file.filename,
			uploadTime: Date.now(),
			connectedTags: []
		};
		app.db.AddMedia(media);
	});
	res.send("Done");
});

export {
	router as UploadRoutes
};