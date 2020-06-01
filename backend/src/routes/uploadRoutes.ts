import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import app from '../app';
import {Media} from '../db';
import sanitize from 'sanitize-filename';
import shortid from 'shortid';

const router = express.Router();

const mediaStorage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/')
	},
	filename(req: Express.Request, file: Express.Multer.File, cb: any) {
		const cleanFilename = sanitize(file.originalname);
		cb(null, cleanFilename)
	}
});

const idleStorage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/idle')
	},
	filename(req: Express.Request, file: Express.Multer.File, cb: any) {
		const cleanFilename = sanitize(file.originalname);
		cb(null, cleanFilename)
	}
});

const mediaFileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype === "video/mp4") {
		cb(null, true);
	} else {
		cb(new Error("Currently only MP4 video files are supported"), false);
	}
}

const idleFileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb(new Error("Currently only PNG image files are supported for the idle screen"), false);
	}
}

const uploadMedia = multer({
	storage: mediaStorage,
	fileFilter: mediaFileFilter
});

const uploadIdle = multer({
	storage: idleStorage,
	fileFilter: idleFileFilter
});

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
	const file = req.file as Express.Multer.File;
	const mediaInDb = app.db.GetMediaByFilename(sanitize(file.originalname));

	mediaInDb
	.then(media => {
		if(media){
			res.send(media);
		}else{
			media = {
				id: shortid.generate(),
				name: file.filename,
				uploadTime: Date.now(),
				connectedTags: []
			};
			app.db.AddMedia(media)
			.then(value => {
				res.send(media);
			})
			.catch(error => {
				res.send("Something went wrong "+error);
			});
		}

	})
	.catch(error => {
		res.send("Something went wrong "+error);
	})
};

router.post('/', uploadMedia.single('file'), uploadFile);
router.post('/idle', uploadIdle.single('file'), uploadFile);

export {
	router as UploadRoutes
};