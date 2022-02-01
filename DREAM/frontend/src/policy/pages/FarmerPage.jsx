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
} from "semantic-ui-react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useHttpClient } from "../../util/http-hook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import Swal from "sweetalert2";

const FarmerList = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [farmer, setFarmer] = useState();
  const id = useParams().id;
  const containerStyle = {
    width: "90%",
    height: "100%",
  };

  const center = {
    lat: 17.669638,
    lng: 78.574823,
  };
  useEffect(() => {
    const getFarmer = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/evaluate/farmerInfo/" + id,
          "GET",
          null
        );
        setFarmer(response);
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
          {/* {!isLoading && farmer && ( */}
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
                    farmer.email }
                  </li>
                  <li>
                    <Label className="mt-2" color="facebook" size="large">
                      Location
                    </Label>{" "}
                    farmer.location.name }{" "}
                  </li>
                  <li>
                    <Label className="mt-2" color="facebook" size="large">
                      Productions
                    </Label>{" "}
                    farmer}
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
                  <Button className="mr-3" color="green">
                    Good Farmer
                  </Button>
                  &nbsp;
                  <Button className="mr-3 ml-3" color="yellow">
                    Assign to a Steering Initiative
                  </Button>
                  &nbsp;
                  <Button className="ml-3" color="red">
                    Bad Farmer
                  </Button>
                </div>

                <h2>Farmer latest productions</h2>
                <hr />
                <div className="container">
                  <Card className="w-100" color="grey">
                    <div className="row">
                      <div className="col-1 pl-3 text-center"></div>
                      <div className="col-5 pl-3 text-left">
                        <h4 className="ml-2 pl-3 mt-4 justify-content-center">
                          <Label className="mt-3" color="teal" size="large">
                            Production Type
                          </Label>{" "}
                          Rice
                          <br />
                          <Label className="mt-3" color="teal" size="large">
                            Production Qty.
                          </Label>{" "}
                          10
                        </h4>
                      </div>
                      <div className="col-5 mb-2 mt-3">
                        <Label className="mb-1" size="large">
                          Problems
                        </Label>
                        <Form>
                          <TextArea
                            readOnly="true"
                            className="text-black"
                            placeholder="Problems found during production"
                          />
                        </Form>
                      </div>
                      <div className="col-12 mt-3 mb-3 pl-4">
                        <hr />
                        <Icon size="large" name="calendar">
                          {" "}
                        </Icon>
                        Date
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* )} */}
        </div>
      </div>
      <center>
        <div className="jumbotron">
          <img
            class="mb-0 mt-3"
            width="100%"
            src="https://lacerba.io/assets/gradient-scolarship.png"
            alt=""
          />
        </div>
      </center>
    </React.Fragment>
  );
};

export default FarmerList;
