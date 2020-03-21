import express, {Request,Response,NextFunction} from 'express';
import app from '../app';
import fs from 'fs';

const router = express.Router();

router.post('/delete', async (req: Request,res: Response, next: NextFunction) => {
	const mediaId = req.body.mediaId;
	try {
		const mediaToDelete = await app.db.GetMedia(mediaId);
		fs.unlinkSync("./uploads/"+mediaToDelete.name);
        await app.db.RemoveMedia(mediaId);
    } catch (e) {
		res.send(e.message);
		return res.end();
	}
	res.send("Delete media with Id "+mediaId);
});

export {
	router as MediaRoutes
};