import React from "react";

import Farmer from "./Production";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Production from "../components/Production"
const ListaProduction = (props) => {
  if (props.productions === 0) {
    return (
      <div className="mx-0 justify-content-center">
        No productions available
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <ul>
          {props.productions.map((production) => (
            <Production production={production} id={production.productionID} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
};
export default ListaProduction;
