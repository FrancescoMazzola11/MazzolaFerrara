import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Form, Card, Button, Icon, Header, Modal, Dropdown, Label } from "semantic-ui-react";
import { useHttpClient } from "../../util/http-hook";
import ListaBadFarmer from "../components/ListaBadFarmers"


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
            {Authorization: "Bearer "+token }
          );
          console.log(response)
          setAgronomists(response.agronomists);
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
              {Authorization: "Bearer "+token }
            );
            console.log(response)
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
        <h2>
          List of Bad Farmers
        </h2>
        <hr/>
         {!isLoading && farmers && (
            <ListaBadFarmer farmers = {farmers}  />
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

export default BadFarmersList;
