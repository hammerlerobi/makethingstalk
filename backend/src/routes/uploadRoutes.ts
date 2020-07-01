import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import app from "../app";
import sanitize from "sanitize-filename";
import shortid from "shortid";
import * as child from "child_process";
import { ServerSidedInput } from "../input/ServerSidedInput";
import { TagCommand } from "../transmitters/IInteractionMessage";

const videoPath = "./uploads/";
const tumbnailPath = videoPath + "thumbnails/";

const router = express.Router();

const mediaStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, videoPath);
  },
  filename(req: Express.Request, file: Express.Multer.File, cb: any) {
    const cleanFilename = sanitize(file.originalname);
    cb(null, cleanFilename);
  },
});

const idleStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../player/assets/");
  },
  filename(req: Express.Request, file: Express.Multer.File, cb: any) {
    cb(null, "idle-screen.jpg");
  },
});

const mediaFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(new Error("Currently only MP4 video files are supported"), false);
  }
};

const allowedIdleMimeTypes = ["image/jpeg", "image/png"];
const idleFileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (allowedIdleMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Currently only " +
          allowedIdleMimeTypes +
          " image files are supported for the idle screen."
      ),
      false
    );
  }
};

const uploadMedia = multer({
  storage: mediaStorage,
  fileFilter: mediaFileFilter,
});

const uploadIdle = multer({
  storage: idleStorage,
  fileFilter: idleFileFilter,
});

const createThumbnail = (fileName: string) => {
  const video = videoPath + fileName;
  // cut off .mp4 ending of filename
  const strippedFileName = fileName.split(".")[0];
  // add .png ending to filename
  const thumbnail = tumbnailPath + strippedFileName + ".png";
  console.log("creating:", thumbnail, video);
  // build ffmpeg command
  const command =
    "ffmpeg -i " + video + " -ss 00:00:03.000 -vframes 1 -y " + thumbnail;
  // create thumbnail directory in case it doesn't exist
  child.exec("mkdir " + tumbnailPath);
  // execute ffmpeg command
  child.exec(command, (error) => {
    if (error) {
      // ups! something went wrong
      console.error(`error creating thumbnail: ${error}`);
      return;
    }
    // yay! it worked
    console.log("thumbnail created");
    // tell frontend that thumbnail is availalbe
    ServerSidedInput.getInstance().send({
      command: TagCommand.thumbnail,
      media: fileName,
      tagID: "", // should be filled
    });
  });
};

const uploadMediaFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file as Express.Multer.File;
  const mediaInDb = app.db.GetMediaByFilename(sanitize(file.originalname));
  console.log("creating thumbnail...");
  createThumbnail(file.filename);
  mediaInDb
    .then((media) => {
      if (media) {
        res.send(media);
      } else {
        media = {
          id: shortid.generate(),
          name: file.filename,
          uploadTime: Date.now(),
          connectedTags: [],
        };
        app.db
          .AddMedia(media)
          .then((value) => {
            res.send(media);
          })
          .catch((error) => {
            res.send("Something went wrong " + error);
          });
      }
    })
    .catch((error) => {
      res.send("Something went wrong " + error);
    });
};

const uploadIdleFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Upload complete.");

  // send update command after upload is finished to reload the player site with the new idel image
  ServerSidedInput.getInstance().send({
    command: TagCommand.update,
    media: "",
    tagID: "",
  });
};

router.post("/", uploadMedia.single("file"), uploadMediaFile);
router.post("/idle", uploadIdle.single("file"), uploadIdleFile);

export { router as UploadRoutes };
