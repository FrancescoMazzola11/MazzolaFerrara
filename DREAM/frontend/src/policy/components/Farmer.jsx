import {
  faCube,
  faCubes,
  faUsers,
  faBroadcastTower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import React from "react";
import { Link } from "react-router-dom";

const Farmer = (props) => {
  return (
    <div className="container-fluid mb-2">
      <div style={{ fontWeight: "bold" }}>
      <hr/>
        <FontAwesomeIcon icon={faCube} /> {props.servizio.type}
      </div>
      {props.name}
      <div>
        <span className="text-muted mt-0" style={{ fontSize: "0.6em" }}>
          {props.description}
        </span>
      </div>
    </div>
  );
};

export default Farmer;
