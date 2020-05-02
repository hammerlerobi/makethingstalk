import React from "react";
import { motion } from "framer-motion";
import { Link, useHistory, useLocation } from "react-router-dom";
import Left from "./idle/left";
import Right from "./idle/right";
import { connect } from "react-redux";
import { setOldPage } from "../components/redux/actions";

const Idle = (props) => {
  let history = useHistory();
  let currentLocation = useLocation().pathname;
  //navigation to upload screen if tag has been detected
  if (props.tagID !== "" && props.oldPage !== currentLocation) {
    history.push("/taglink");
    props.setOldPage(currentLocation);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75 } }}
      className="container-fluid p-0"
    >
      <Link to="/taglink">
        <div className="row vh-100 p0 m-0 gradient-bg">
          <Left></Left>
          <Right></Right>
        </div>
      </Link>
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    tagID: state.tagID,
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
