import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import app from '../app';
import sanitize from 'sanitize-filename';
import shortid from 'shortid';
import {ServerSidedInput} from '../input/ServerSidedInput';
import { TagCommand } from '../transmitters/IInteractionMessage';

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
		cb(null, '../player/assets/')
	},
	filename(req: Express.Request, file: Express.Multer.File, cb: any) {
		cb(null, 'idle-screen.jpg')
	}
});

const mediaFileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
	if (file.mimetype === "video/mp4") {
		cb(null, true);
	} else {
		cb(new Error("Currently only MP4 video files are supported"), false);
	}
}

const allowedIdleMimeTypes = ["image/jpeg"];
const idleFileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
	if (allowedIdleMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Currently only " + allowedIdleMimeTypes + " image files are supported for the idle screen."), false);
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

const uploadMediaFile = async (req: Request, res: Response, next: NextFunction) => {
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

const uploadIdleFile = async (req: Request, res: Response, next: NextFunction) => {
	res.send("Upload complete.");

	// send update command after upload is finished to reload the player site with the new idel image
	ServerSidedInput.getInstance().send({
		command: TagCommand.update,
		media: "",
		tagID: "",
	  }
	)

};


router.post('/', uploadMedia.single('file'), uploadMediaFile);
router.post('/idle', uploadIdle.single('file'), uploadIdleFile);

export {
	router as UploadRoutes
};