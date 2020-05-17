import express, {Request,Response,NextFunction} from 'express';
import {ServerSidedInput} from '../input/ServerSidedInput';
import app from '../app';
import { TagCommand } from '../transmitters/IInteractionMessage';

const router = express.Router();
router.post('/link', async (req: Request,res: Response, next: NextFunction) => {

	let isNewTag = false;
	const tagId = req.body.tagId;
	const mediaId = req.body.mediaId;

	let media;
	let tag;

	try {
        media = await app.db.GetMedia(mediaId);
    } catch (e) {
		res.send(e.message);
		return res.end();
	}
	try {
		tag = await app.db.GetTag(tagId);
    } catch (e) {
		// For tags if we dont find one we can create on.
		tag  = {id: tagId,medias:[]};
		isNewTag = true;
	}

	// Check if tag is already linked and clear links
	if (tag.medias.length>0){
		try {
			const connectedMedia = await app.db.GetMedia(tag.medias[0]);
			connectedMedia.connectedTags =[];
			await app.db.UpdateMedia(connectedMedia);
		} catch (e) {
			// For tags if we dont find one we can create on.
			tag  = {id: tagId,medias:[]};
			isNewTag = true;
		}
	}

	// for now we assume that we have 1:1 Relations so we clear the arrays
	media.connectedTags = [];
	tag.medias = [];

	media.connectedTags.push(tagId);
	tag.medias.push(mediaId);

	await app.db.UpdateMedia(media);
	if(isNewTag)
		await app.db.AddTag(tag);
	else
		await app.db.UpdateTag(tag);

	app.db.GetMedia(tag.medias[0]).then((med)=>{
		ServerSidedInput.getInstance().send({
			command: TagCommand.play,
			media: med.name,
			tagID: "", // should be filled
		  }
		)

	})
	res.json({"status":"SUCCESS","tag":tag})
});


export {
	router as TagRoutes
};