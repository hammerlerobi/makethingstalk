import React from "react";
import { Link } from "react-router-dom";
import Tag from "./tag";
import adjNoun from "adj-noun";
import { motion } from "framer-motion";

import "../styles/step2.scss";
import { Connection } from "./utilities/websocket";

const TagLink = () => {
  adjNoun.seed(parseInt(Math.random() * 999));
  const isData = Connection();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transitino: { duration: 0.75 } }}
      className="container-fluid p-0"
    >
      {" "}
      <Link to="/">
        <div className="row vh-100 p0 m-0 bg">
          <div className="col p-0 d-flex flex-column justify-content-center align-items-center">
            <Tag
              color={get_random_color()}
              name={adjNoun().join("-")}
              id={isData}
              video=""
            ></Tag>
            <motion.p
              animate={{ opacity: [0, 1] }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              className="headline mt-5"
            >
              Klicke auf den Bildschirm oder lege einfach dein Video hier ab um
              es mit dem Tag zu verlinken
            </motion.p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default TagLink;

function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}

function get_random_color() {
  var h = rand(1, 360); // color hue between 1 and 360
  var s = rand(60, 80); // saturation 30-100%
  var l = rand(45, 55); // lightness 30-70%
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
