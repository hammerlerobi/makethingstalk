import React from "react";
import { motion } from "framer";
import { connect } from "react-redux";
import { transform } from "framer-motion";

const transition = {
  ease: "backOut",
  duration: 0.5,
};
const variants = {
  open: { scale: [0, 1], opacity: [0, 1], rotate: [-40, 0], ...transition },
  uploaded: { scale: [1, 1.3, 1], rotate: [0, 10, 0], ...transition },
};

const Tag = (props) => {
  const progress = transform(props.uploadProgress, [0, 100], [0, 1]);
  const uploader = props.upload === "uploading" ? progress : 1;
  const uploadTransition =
    uploader === 1 ? "all 0.00s ease-in-out" : "all 0.15s ease-in-out";

  return (
    <motion.div
      animate={props.upload === "finished" ? "uploaded" : "open"}
      variants={variants}
      transition={transition}
      className="tag d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="upload-progress"
        style={{
          transform: "scaleY(" + uploader + ")",
          backgroundImage: "url(./backend/uploads/thumbnails/1.jpg)",
          backgroundColor: props.tagColor,
          transition: uploadTransition,
        }}
      ></div>

      <h2>{props.tagName}</h2>
      {props.media ? <h4>{props.media}</h4> : ""}
      <h5>#{props.tagID}</h5>
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  tagID: state.tagID,
  tagName: state.tagName,
  tagColor: state.tagColor,
  media: state.media,
  upload: state.upload,
});

export default connect(mapStateToProps)(Tag);
