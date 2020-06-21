import React from "react";
import { motion } from "framer";
import { connect, useSelector } from "react-redux";
import { transform } from "framer-motion";
import { getThumbnail } from "../redux/rootReducer";

const transition = {
  ease: "backOut",
  duration: 0.5,
};
const variants = {
  open: {
    scale: [0, 1],
    opacity: [0, 1],
    rotate: [-40, 0],
    transition: { ...transition },
  },
  uploaded: {
    scale: [1, 1.3, 1],
    rotate: [0, 10, 0],
    transition: { ...transition },
  },
  checkmark: {
    scale: [1, 1.1, 1],
    opacity: [0, 1],
    rotate: 45,
    transition: { ...transition },
  },
  hide: { scale: 0, opacity: 0, rotate: 0, transition: { ...transition } },
};

const Tag = (props) => {
  const progress = transform(props.uploadProgress, [0, 100], [0, 1]);
  const uploader =
    props.upload === "uploading" ? progress : props.media ? 1 : 0;

  //if file already linked -> progress = 1

  return (
    <div>
      {props.upload === "finished" ? (
        <motion.div
          initial={variants.hide}
          animate={variants.checkmark}
          exit={variants.hide}
          style={{
            border: "solid #FAA82E",
            borderWidth: "0px 20px 20px 0px",
          }}
          className="checkmark"
        ></motion.div>
      ) : (
        <motion.div
          animate={props.upload === "finished" ? "uploaded" : "open"}
          variants={variants}
          className="tag d-flex flex-column justify-content-center align-items-center"
        >
          {" "}
          <div
            className="upload-progress"
            style={{
              transform: "scaleY(" + uploader + ")",
              background:
                "url(media/thumbnails/" + props.thumbnail + "), #FAA82E",
            }}
          ></div>
          {props.media ? <h4>{props.media}</h4> : ""}
        </motion.div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tagID: state.tagID,
  // tagColor: state.tagColor,
  media: state.media,
  upload: state.upload,
  thumbnail: state.tagThumbnail,
});

export default connect(mapStateToProps)(Tag);
