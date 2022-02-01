import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import { useHttpClient } from "../../util/http-hook";
import ListaSteerings from "../components/ListaSteerings"


 import Swal from "sweetalert2";
import authService from "../../services/authService";


const SteeringsList = () => {
    const { sendRequest, isLoading } = useHttpClient();
    const [initiatives, setInitiatives] = useState();
    const token = authService.getCurrentToken();

    useEffect(() => {
        const getInitiatives = async () => {
          try {
            const response = await sendRequest(
              process.env.REACT_APP_BASE_URL + "/evaluate/getSteering",
              "GET",
              null,
              {Authorization: "Bearer "+token }
            );
            console.log(response);
            setInitiatives(response.steeringList);
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Something went wrong...",
              text: error.message,
            });
          }
        };
        getInitiatives();
      }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="container">
      <div class="mt-3 pt-3">
        <h2>
          List of Steering Initiatives
        </h2>
        <hr/>
         {!isLoading && initiatives && (
            <ListaSteerings initiatives = {initiatives}  />
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

export default SteeringsList;
