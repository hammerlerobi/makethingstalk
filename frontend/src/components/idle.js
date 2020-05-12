import React from "react";
import { motion } from "framer-motion";
import { useHistory, useLocation } from "react-router-dom";
import Left from "./idle/left";
import { connect } from "react-redux";
import { setOldPage } from "../components/redux/actions";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75 } }}
      className="container-fluid p-0"
    >
      <div className="row vh-100 p0 m-0 gradient-bg">
        <Left></Left>
      </div>
    </motion.div>
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
