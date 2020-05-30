import express, {Request,Response,NextFunction} from 'express';
import multer from 'multer';
import app from '../app';
import {Media} from '../db';
import sanitize from 'sanitize-filename';
import shortid from 'shortid';
import * as child from 'child_process';
import {ServerSidedInput} from '../input/ServerSidedInput';
import { TagCommand } from '../transmitters/IInteractionMessage';

const videoPath = './uploads/'
const tumbnailPath = videoPath + 'thumbnails/'

const router = express.Router();
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, videoPath)
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


const createThumbnail = (fileName:string) => {

	const video = videoPath + fileName;
	// cut off .mp4 ending of filename
	const strippedFileName = fileName.split('.')[0];
	// add .png ending to filename
	const thumbnail = tumbnailPath + strippedFileName + '.png'
	// build ffmpeg command
    const command = 'ffmpeg -i ' + video + ' -ss 00:00:03.000 -vframes 1 ' + thumbnail;
    // create thumbnail directory in case it doesn't exist
    child.exec('mkdir ' + tumbnailPath);
    // execute ffmpeg command
    child.exec(command, (error) => {
        if (error) {
		  // ups! something went wrong
          console.error(`error creating thumbnail: ${error}`);
          return;
        }
		// yay! it worked
        console.log('thumbnail created');
		// tell frontend that thumbnail is availalbe
        ServerSidedInput.getInstance().send({
          command: TagCommand.thumbnail,
		  media: fileName,
		  tagID: "" // should be filled
          }
        );

    })

}

router.post('/', upload.single('file'), async (req: Request,
	res: Response, next: NextFunction) => {
	const file = req.file as Express.Multer.File;
	const mediaInDb = app.db.GetMediaByFilename(sanitize(file.originalname));

	createThumbnail(file.filename);

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