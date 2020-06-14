import React from "react";
import request from "superagent";
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
  const onChangeHandler = (event) => {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);

    request
      .post("/api/upload/idle")
      .send(formData)
      .on("progress", (event) => {
        console.log(event.percent);
      })
      .then((res) => {
        console.log("upload complete");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            Definiere ein Bild, welches angezeigt wird, wenn gerade kein Video
            abspielt.
          </p>
          <input
            class
            type="file"
            accept="image/*"
            onChange={onChangeHandler}
            id="imageUpload"
            style={{ display: "none" }}
          />
          <label for="imageUpload" class="btn btn-dark">
            Bild auswählen
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default Right;
