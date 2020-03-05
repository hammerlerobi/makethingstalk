import express, {
	Request,
	Response,
	NextFunction
} from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './uploads/')
	},

	filename(req: any, file: any, cb: any) {
		cb(null, file.originalname)
	}
});
const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/png") {

		cb(null, true);
	} else {
		cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
	}
}
const upload = multer({
	storage,
	fileFilter
});

router.post('/', upload.array('images', 5), async (req: Request,
	res: Response, next: NextFunction) => {
	res.send("Done");
});

export {
	router as UploadRoutes
};