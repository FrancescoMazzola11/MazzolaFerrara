import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import BadFarmer from "./BadFarmer";

const ListaBadFarmers = (props) => {
  if (props.farmers.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        No "Bad Farmer" is here at the moment.
      </div>
    );
  } else {
    return (
      <div className=" my-2 mx-3">
        <table class="ui celled table">
          <thead>
            <tr>
              <th class="ten wide text-center">Farmer</th>
              <th class="three wide text-center">
                <Icon size="large" name="add user" />
              </th>
            </tr>
          </thead>
          <tbody>
            {props.farmers.map((farmer) => (
              <BadFarmer farmer ={farmer} agronomists= {props.agronomists} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
export default ListaBadFarmers;
