import React from "react";

import Farmer from "./Production";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListaFarmers = (props) => {
  if (props.farmers.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        Nessun farmer presente in DREAMS
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className=" my-2 mx-3">
          <table class="ui celled table" style={{ fontSize: "1.3em" }}>
            <thead>
              <tr>
                <th class="ten wide text-center">Farmer</th>
                <th class="three wide text-center">
                  <Icon size="large" name="eye" />
                </th>
              </tr>
            </thead>
            <tbody>
              {props.farmers.map((farmer) => (
                <tr className="mt-2">
                  <td className="text-center justify-content-end mt-3 pt-3">
                    {farmer.trend && (
                      <React.Fragment>
                        &nbsp;
                        {/* <span
                          className="btn-success btn-lg rounded-pill"
                          color="teal"
                        > */}
                        {/* <Icon name="certificate" color="teal" /> */}
                        <Icon name="check circle" color="teal" />
                        {/* </span> */}
                      </React.Fragment>
                    )}
                    &nbsp;
                    {farmer.mail}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/farmerpage/${farmer.id}`}
                      className=" btn btn-success text-decoration-none"
                      activeClassName="active"
                      style={{ backgroundColor: "teal", color: "white" }}
                    >
                      View Farmer
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Icon name="check circle" color="teal" />{": Is a good farmer"}
        </div>

        <br></br>
      </React.Fragment>
    );
  }
};

export default ListaFarmers;
