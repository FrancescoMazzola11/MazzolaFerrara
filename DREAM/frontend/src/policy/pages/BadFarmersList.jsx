import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../util/http-hook";
import ListaBadFarmer from "../components/ListaBadFarmers";

import Swal from "sweetalert2";
import authService from "../../services/authService";

const BadFarmersList = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [farmers, setFarmers] = useState();
  const [agronomists, setAgronomists] = useState();
  const token = authService.getCurrentToken();

  useEffect(() => {
    // get agronomists in order to assign them to a steering initiative
    const getAgronomists = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/steering/getAgronomists",
          "GET",
          null,
          { Authorization: "Bearer " + token }
        );
        const agronomist_response = [];
        response.agronomists.forEach((agronomist) => {
          agronomist_response.push({
            key: agronomist.agronomistID,
            value: agronomist.agronomistID,
            text: agronomist.email,
          });
        });
        setAgronomists(agronomist_response);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    // get bad performing farmers
    const getFarmers = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/steering/getBadFarmers",
          "GET",
          null,
          { Authorization: "Bearer " + token }
        );
        console.log(response);
        setFarmers(response.badFarmers);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getFarmers();
    getAgronomists();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="container">
        <div class="mt-3 pt-3">
          <h2>List of bad farmers</h2>
          <hr />
          {!isLoading && farmers && agronomists && (
            <ListaBadFarmer farmers={farmers} agronomists={agronomists} />
          )}
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default BadFarmersList;
