import express, {Request,Response,NextFunction} from 'express';
import {ServerSidedInput} from '../input/ServerSidedInput';
import app from '../app';

const router = express.Router();
router.get('/state', async (req: Request,res: Response, next: NextFunction) => {

	let tags;


	try {
		tags = await app.db.GetAllTags();
    } catch (e) {
		// For tags if we dont find one we can create on.

	}


	// for now we assume that we have 1:1 Relations so we clear the arrays

	// app.db.GetMedia(tag.medias[0]).then((med)=>{
	// 	ServerSidedInput.getInstance().send({
	// 		command: TagCommand.play,
	// 		media: med.name,
	// 		tagID: "", // should be filled
	// 	  }
	// 	)

	// })

	console.log("tag count requested:", tags.length);

	res.json({"status":"SUCCESS","nTags":tags.length})
	// res.send("the result is " + tags.length);
});


export {
	router as PlayerRoutes
};