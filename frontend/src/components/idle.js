import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Left from "./idle/left";
import Right from "./idle/right";
import { connect } from "react-redux";
import { setOldPage } from "../components/redux/actions";
import { motion } from "framer-motion";

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: transition },
  exit: {
    opacity: 0,
    transition: transition,
  },
};

const Idle = (props) => {
  let history = useHistory();
  let currentLocation = useLocation().pathname;
  //navigation to upload screen if tag has been detected
  if (
    (props.tagCommand === "NewTAG" || props.tagCommand === "Play") &&
    props.oldPage !== currentLocation
  ) {
    props.setOldPage(currentLocation);
    history.push("/taglink");
  }

  return (
    <div className="container-fluid p-0">
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        className="row vh-100 p0 m-0 gradient-bg"
      >
        <Left></Left>
        <Right></Right>
      </motion.div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tagCommand: state.command,
    oldPage: state.oldPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOldPage: (oldPage) => {
      dispatch(setOldPage(oldPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Idle);
