import React from "react";
import Tag from "./tag";
import adjNoun from "adj-noun";
import { motion } from "framer";
import { Link } from "react-router-dom";

import "../styles/step2.scss";

const transition = { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { scale: 1, opacity: 0, delay: 0 },
  enter: { scale: 1, opacity: 1, y: 0, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { duration: 1.5, ...transition },
  },
};

function Step2() {
  adjNoun.seed(parseInt(Math.random() * 999));

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className="container-fluid p-0"
    >
      {" "}
      <Link to="/">
        <div className="row vh-100 p0 m-0 bg">
          <div className="col p-0 d-flex flex-column justify-content-center align-items-center">
            <Tag
              color={get_random_color()}
              name={adjNoun().join("-")}
              id="123-456-789"
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
}

export default Step2;

function rand(min, max) {
  return parseInt(Math.random() * (max - min + 1), 10) + min;
}

function get_random_color() {
  var h = rand(1, 360); // color hue between 1 and 360
  var s = rand(60, 80); // saturation 30-100%
  var l = rand(45, 55); // lightness 30-70%
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
