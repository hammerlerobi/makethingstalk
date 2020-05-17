import React from "react";
import { motion } from "framer-motion";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { opacity: 0, delay: 0, y: -50 },
  enter: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 1, ...transition },
  },
};

const Right = () => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="col p-0 "
    >
      <div className="load-video">
        <div className="load-video-animation h-60">
          <div className="animation-player"></div>
        </div>
        <div className="headline h-40">
          <p>
            Drag’n’Drop ein Video hier um es <br />
            als Platzhalter zu definieren.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Right;
