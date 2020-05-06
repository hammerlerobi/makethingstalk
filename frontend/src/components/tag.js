import React from "react";
import { motion } from "framer";
import { connect } from "react-redux";

const transition = {
  ease: "backOut",
  duration: 0.8,
};
const variants = {
  open: { scale: [0, 1], opacity: [0, 1], rotate: [-40, 0], ...transition },
  uploaded: { scale: [1, 1.3, 1], rotate: [0, 10, 0], ...transition },
};

const Tag = (props) => {
  return (
    <motion.div
      animate={props.upload === false ? "uploaded" : "open"}
      variants={variants}
      transition={{
        ease: "backOut",
        duration: 0.8,
      }}
      className="tag d-flex flex-column justify-content-center align-items-center"
    >
      <div
        className="upload-progress"
        style={{
          transform: "scaleY(" + props.scale + ")",
          backgroundColor: props.tagColor,
        }}
      ></div>

      <h2>{props.tagName}</h2>
      <h5>{props.tagID}</h5>
      {props.media ? <h5>{props.media}</h5> : ""}
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
