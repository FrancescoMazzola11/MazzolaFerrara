import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {
  Form,
  Card,
  Button,
  Icon,
  Header,
  TextArea,
  Label,
} from "semantic-ui-react";
import { useHttpClient } from "../../util/http-hook";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import Swal from "sweetalert2";

const SteeringPage = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [farmer, setFarmer] = useState();
  const id = useParams().id;
  const containerStyle = {
    width: "100%",
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
          process.env.REACT_APP_JAVA_BASE_URL + "/evaluate/steeringInfo/" + id,
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
              <div className="col-md-8 mt-3" style={{ fontSize: "large" }}>
                <Icon name="user"></Icon>
                <Label className="mt-2" color="teal" size="large">
                  Farmer
                </Label>{" "}
                farmer.email }
                <br />
                <Icon name="user"></Icon>
                <Label className="mt-2" color="teal" size="large">
                  Agronomist
                </Label>{" "}
                agronomist.name } <br />
                <Icon name="map"></Icon>
                <Label className="mt-2" color="facebook" size="large">
                  Location
                </Label>{" "}
                location.name } <br />
                <Icon name="numbered list"></Icon>
                <Label className="mt-2" color="facebook" size="large">
                  Productions
                </Label>{" "}
                production.name }{" "}
                {/* get list of production types of the farmer */}
              </div>
              <div className="col-md-4">
              <LoadScript googleMapsApiKey="AIzaSyDX_OSdMYc79SeKrOLBh7VqZ5_n-mdexew">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={9}
                  >
                    {/* Child components, such as markers, info windows, etc. */}
                    <></>
                  </GoogleMap>
                </LoadScript>
              </div>
              <div className="row mt-3">
                <div className="col-md-12 text-center mt-3 mb-3">
                  <Button className="mr-3" color="green">
                    Good Steering Initiative
                  </Button>
                </div>
                <h2>Productions report</h2>
                <p>
                  Production rates from <strong>two months before</strong> the
                  start of the steering initiative to
                  <strong>three months after</strong> the end od the initiative
                  itself.
                </p>
                <hr />
                <div className="container">
                  <table class="ui celled table">
                    <thead>
                      <tr>
                        <th class="five wide text-center">Before</th>
                        <th class="one wide text-center">
                        </th>
                        <th class="five wide text-center">After</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>farmer.mail}</td>
                          <td className="text-center">
                            {/* <Link
                              to={`/farmerpage/`}
                              className=" btn btn-success text-decoration-none"
                              activeClassName="active"
                              style={{
                                backgroundColor: "teal",
                                color: "white",
                              }}
                            >
                              View Farmer
                            </Link> */}
                            <Icon className="text-success" name="arrow circle right"></Icon>
                          </td>
                        </tr>
                    </tbody>
                  </table>
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

export default SteeringPage;
