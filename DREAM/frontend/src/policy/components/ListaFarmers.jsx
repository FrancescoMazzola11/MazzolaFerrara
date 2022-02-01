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
          <table class="ui celled table">
            <thead>
              <tr>
                <th class="ten wide">Farmer</th>
                <th class="three wide text-center">
                  <Icon name="eye" />
                </th>
              </tr>
            </thead>
            <tbody>
              {props.farmers.map((farmer) => (
                //avoid formatting using an object each but rather get the objects into a single table without using the FarmerObject
                // <Farmer
                //   key={farmer.id}
                //   name={farmer.mail}
                //   farmerid={farmer.id}
                //   />
                <tr>
                  <td>{farmer.mail}</td>
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
        </div>

        <br></br>
      </React.Fragment>
    );
  }
};

export default ListaFarmers;
