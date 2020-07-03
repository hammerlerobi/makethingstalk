import React from "react";
import request from "superagent";
import { motion } from "framer-motion";
import fallbackImage from "../../assets/idle-screen.jpg";
import IP from "../utilities/ip-settings";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { y: -50 },
  enter: { y: 0, transition },
  exit: {
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
        window.location.reload();
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
      className="col p-0 d-flex flex-column justify-content-center align-items-center"
    >
      {/* <div className="animation-player"></div> */}
      <object
        className="idle-image mb-4"
        data={`http://${IP}/player/assets/idle-screen.jpg`}
        type="image/png"
      >
        <img src={fallbackImage} alt="" />
      </object>
      <div className="p-0 mt-4 headline">
        <p style={{ position: "relative" }}>
          Definiere ein Bild, welches angezeigt wird, wenn gerade kein Video
          abspielt.
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onChangeHandler}
        id="imageUpload"
        style={{ display: "none" }}
      />
      <label htmlFor="imageUpload" className="btn pl-4 pr-4 btn-blue">
        Bild auswählen
      </label>
    </motion.div>
  );
};

export default Right;
