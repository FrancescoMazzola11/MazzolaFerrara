import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import { useHttpClient } from "../../util/http-hook";
import ListaFarmer from "./../components/ListaFarmers"


 import Swal from "sweetalert2";
import authService from "../../services/authService";


const FarmerList = () => {
    const { sendRequest, isLoading } = useHttpClient();
    const [farmers, setFarmers] = useState();
    const token = authService.getCurrentToken();

    useEffect(() => {
        const getFarmers = async () => {
          try {
            const response = await sendRequest(
              process.env.REACT_APP_BASE_URL + "/evaluate/getFarmers",
              "GET",
              null,
              {Authorization: "Bearer "+token }

            );
            setFarmers(response.farmers);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Something went wrong...",
              text: error.message,
            });
          }
        };
        getFarmers();
      }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="container">
      <div class="mt-3 pt-3">
        <h2>
          List of Farmers
        </h2>
        <hr/>
         {!isLoading && farmers && (
            <ListaFarmer farmers = {farmers}  />
          )}
      </div>
              </div>
              <center>
              <div className="jumbotron">
              <img class="mb-0 mt-3" width="100%" src="https://lacerba.io/assets/gradient-scolarship.png" alt=""/>
              </div>
              </center>
    </React.Fragment>
  );
};

export default FarmerList;
