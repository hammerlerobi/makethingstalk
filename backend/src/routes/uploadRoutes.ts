import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import app from '../app';
import {Media} from '../db';
import sanitize from 'sanitize-filename';
import shortid from 'shortid';
import ffmpeg = require('ffmpeg');

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
		cb(null, true);
	} else {
		cb(new Error("Currently only MP4 video files are supported"), false);
	}
}

const upload = multer({
	storage,
	fileFilter
});

router.post('/', upload.single('file'), async (req: Request,
	res: Response, next: NextFunction) => {
	const file = req.file as Express.Multer.File;
	const mediaInDb = app.db.GetMediaByFilename(sanitize(file.originalname));


	//

	try {
		const process = new ffmpeg('./uploads/' + file.filename);
		process.then(video => {
			// Callback mode
			video.fnExtractFrameToJPG('./uploads/', {
				frame_rate : 1,
				number : 1,
				file_name : 'my_frame_%t_%s'
			}, (error, files) => {
				if (!error)
					console.log('Frames: ' + files);
			});
		}, (err) => {
			console.log('Error: ' + err);
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}

	//

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
	});




});

export {
	router as UploadRoutes
};