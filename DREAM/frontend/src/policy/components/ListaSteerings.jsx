import React from "react";

import Farmer from "./Production";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListaSteerings = (props) => {
  console.log(props);
  if (props.initiatives.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        No steering initiatives available
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className=" my-2 mx-3">
          <table class="ui celled table">
            <thead>
              <tr>
                <th class="five wide text-center">Starting Date</th>
                <th class="five wide text-center">Farmer</th>
                <th class="three wide text-center">
                  <Icon size="large" name="eye" />
                </th>
              </tr>
            </thead>
            <tbody>
              {props.initiatives.map((initiative) => (
                <tr>
                  <td className="text-center">{initiative.startingDate}</td>
                  <td className="text-center">{initiative.farmer.mail}</td>
                  <td className="text-center">
                    <Link
                      to={`/steeringpage/${initiative.initativeID}`}
                      className=" btn btn-success text-decoration-none"
                      activeClassName="active"
                      style={{ backgroundColor: "teal", color: "white" }}
                    >
                      View Initiative
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br></br>
      </React.Fragment>
    );
  }
};
export default ListaSteerings;
