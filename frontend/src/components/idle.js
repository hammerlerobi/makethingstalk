import React from "react";
import "../styles/index.scss";

function Idle(props) {
  return (
    <div>
      <div className="leftSide">
        <div className="headline">
          Plaziere ein RFID Chip auf der Box um dein Video damit zu verknüpfen.
        </div>
      </div>
    </div>
  );
}

Idle.propTypes = {};

export default Idle;
