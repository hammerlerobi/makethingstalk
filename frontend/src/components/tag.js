import React from "react";
import { motion } from "framer";

const Tag = (props) => {
  return (
    <motion.div
      animate={{ scale: [0, 1], opacity: [0, 1], rotate: [-40, 0] }}
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
          backgroundColor: props.color,
        }}
      ></div>

      <h2>{props.name}</h2>
      {props.video ? <h5>{props.video}</h5> : ""}
      <h5>{props.id}</h5>
    </motion.div>
  );
};

Tag.defaultProps = {
  scale: 1,
};

export default Tag;
