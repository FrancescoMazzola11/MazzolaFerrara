import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import {
  Form,
  Card,
  Button,
  Icon,
  Header,
  TextArea,
  Label,
  Message,
} from "semantic-ui-react";
import { useNavigate } from "react-router";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useHttpClient } from "../../util/http-hook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Swal from "sweetalert2";
import authService from "../../services/authService";
import ListaProduction from "../components/ListaProduction";

const FarmerList = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [farmer, setFarmer] = useState();
  const navigate = useNavigate();
  const id = useParams().id;
  const containerStyle = {
    width: "90%",
    height: "100%",
  };
  const token = authService.getCurrentToken();

  const center = {
    lat: 17.669638,
    lng: 78.574823,
  };
  //evaluate function to evaluate farmer depending on the evaluation grade
  const evaluate = async (grade) => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BASE_URL + "/evaluate/evaluateFarmer/",
        "POST",
        JSON.stringify({ farmerID: farmer.farmerInfo.id, grade }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Farmer correctly evaluated"
      }).then(()=>{navigate("/")});    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong...",
        text: error.message,
      });
    }
  };
  useEffect(() => {
    const getFarmer = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/evaluate/farmerInfo/" + id,
          "GET",
          null,
          { Authorization: "Bearer " + token }
        );
        setFarmer(response.farmerInfo);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getFarmer();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="container">
        <div class="mt-3 pt-3">
          <h2>Farmer information</h2>
          <hr />
          {!isLoading && farmer && (
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img
                    width="70%"
                    src="https://media.istockphoto.com/vectors/default-gray-placeholder-man-vector-id871752462?k=20&m=871752462&s=612x612&w=0&h=BTrZB8slanBvVw-1hwwf8mew5HkpDOyHIJAWDdBwIr8="
                  ></img>
                </div>
                <div className="col-md-4 mt-3" style={{ fontSize: "large" }}>
                  <ul>
                    <li>
                      <Label className="mt-2" color="facebook" size="large">
                        Email
                      </Label>{" "}
                      {farmer.farmerInfo.mail}
                    </li>
                    <li>
                      <Label className="mt-2" color="facebook" size="large">
                        Location
                      </Label>{" "}
                      {farmer.farmerInfo.location.name}{" "}
                    </li>
                    <li>
                      <Label className="mt-2" color="facebook" size="large">
                        Production Types
                      </Label>{" "}
                      {farmer.farmerInfo.ProdTypeFarmers.map((prod) => (
                        <Label className="mt-2" color="facebook">
                          {prod.prodType.name}
                        </Label>
                      ))}
                    </li>
                    {/* get list of production types of the farmer */}
                  </ul>
                </div>

                <div className="col-md-4">
                  <LoadScript googleMapsApiKey="AIzaSyDX_OSdMYc79SeKrOLBh7VqZ5_n-mdexew">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={8}
                    >
                      {/* Child components, such as markers, info windows, etc. */}
                      <></>
                    </GoogleMap>
                  </LoadScript>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-center mt-3 mb-3">
                    <Button
                      className="ml-3"
                      color="green"
                      onClick={() => evaluate(1)}
                    >
                      Good Farmer &nbsp;
                      <Icon name="thumbs up" />
                    </Button>
                    &nbsp;
                    {/* <Button className="mr-3 ml-3" color="yellow">
                      Assign to a Steering Initiative
                    </Button>
                    &nbsp; */}
                    <Button
                      className="ml-3"
                      color="red"
                      onClick={() => evaluate(0)}
                    >
                      Bad Farmer &nbsp;
                      <Icon name="thumbs down" />
                    </Button>
                  </div>

                  <h2>Farmer latest productions</h2>
                  <hr />
                  <div className="container">
                    {!isLoading && farmer.farmerProductions && (
                      <ListaProduction productions={farmer.farmerProductions} />
                    )}
                    {!isLoading && farmer.farmerProductions.length==0 && (
                      <React.Fragment>
                      <Message color="teal">
                        <Message.Header>No data available</Message.Header>
                        <p>
                          It was not possible to retrieve information on the farmer's productions.
                          (No productions were found in the database)
                        </p>
                      </Message>
                    </React.Fragment>
)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default FarmerList;
