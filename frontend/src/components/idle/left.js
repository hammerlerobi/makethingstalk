import React from "react";
import { motion } from "framer-motion";

const transition = { duration: 0.75, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { opacity: 0, delay: 0, y: 50 },
  enter: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.75, ...transition },
  },
};

const Left = () => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="col p-0"
    >
      <div className="place-tag">
        <div className="headline h-40">
          <p>
            Plaziere ein RFID Chip auf der Box <br /> um dein Video damit zu
            verknüpfen.
          </p>
        </div>
        <div className="place-tag-animation h-60">
          <div className="animation-box">
            <motion.div
              animate={{ y: 50 }}
              transition={{
                ease: "easeInOut",
                flip: Infinity,
                duration: 6,
              }}
              className="animation-tag"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Left;
