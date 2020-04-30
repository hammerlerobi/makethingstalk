import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { scale: 1, opacity: 0, delay: 0, y: 50 },
  enter: { scale: 1, opacity: 1, y: 0, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition },
  },
};

function Idle() {
  return (
    <div className="container-fluid p-0">
      <Link to="/step2">
        <div className="row vh-100 p0 m-0 gradient-bg">
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
                  Plaziere ein RFID Chip auf der Box <br /> um dein Video damit
                  zu verknüpfen.
                </p>
              </div>
              <div className="place-tag-animation h-60">
                <div className="animation-box">
                  <motion.div
                    animate={{ y: 60 }}
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
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
              ...variants,
              initial: { y: -50, opacity: 0 },
            }}
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
        </div>
      </Link>
    </div>
  );
}

Idle.propTypes = {};

export default Idle;

{
  /* <div className="col p-0 section-skew-left">
<div className="place-tag anti-skew">
	<div className="headline h-50 ">
		<p>
			Plaziere ein RFID Chip auf der Box <br /> um dein Video damit zu
			verknüpfen.
		</p>
	</div>
	<div className="place-tag-animation h-50"></div>
</div>
</div>
<div className="col p-0 section-skew-right">
<div className="load-video"></div>
</div> */
}
