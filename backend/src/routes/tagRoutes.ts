import express, {Request,Response,NextFunction} from 'express';
import app from '../app';
import {Media} from '../db';

import shortid from 'shortid';
import { promises, Resolver } from 'dns';

const router = express.Router();
router.post('/linkTag', async (req: Request,res: Response, next: NextFunction) => {

	let isNewTag = false;
	const tagId = req.body.tagId;
	const mediaId = req.body.mediaId;

	let media;
	let tag;

	try {
        media = await app.db.GetMedid(mediaId);
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

	// for now we assume that we have 1:1 Relations so we clear the arrays
	media.connectedTags = [];
	tag.medias = [];

	media.connectedTags.push(tagId);
	tag.medias.push(tagId);

	await app.db.UpdateMedia(media);
	if(isNewTag)
		await app.db.AddTag(tag);
	else
		await app.db.UpdateTag(tag);
	res.send("Linked Tag with ID:"+tagId+" to Media with ID:"+mediaId);
});


export {
	router as TagRoutes
};