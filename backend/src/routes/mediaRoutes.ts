import express, {Request,Response,NextFunction} from 'express';
import app from '../app';
import fs from 'fs';

const router = express.Router();

router.get('/delete', async (req: Request,res: Response, next: NextFunction) => {
	const mediaId = req.query.mediaId;
	try {
		const mediaToDelete = await app.db.GetMedia(mediaId);
		fs.unlinkSync("./uploads/"+mediaToDelete.name);
        await app.db.RemoveMedia(mediaId);
    } catch (e) {
		await app.db.RemoveMedia(mediaId);
		res.send(e.message + "still removed db entry");
		return res.end();
	}
	res.send("Delete media with Id "+mediaId);
});

router.get('/', async (req: Request,res: Response, next: NextFunction) => {
	try {
		const mediaList = await app.db.GetAllMedia();
		res.json(mediaList);
    } catch (e) {
		res.send(e.message);
		return res.end();
	}
});

export {
	router as MediaRoutes
};