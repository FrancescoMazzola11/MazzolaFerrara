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
  Message,
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
import { useNavigate } from "react-router";
import authService from "../../services/authService";

const SteeringPage = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [steering, setSteering] = useState();
  const id = useParams().id;
  const navigate = useNavigate();
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  const center = {
    lat: 17.669638,
    lng: 78.574823,
  };
  const token = authService.getCurrentToken();
  //evaluate function for the steering, based on the evaluation grade
  const evaluate = async (grade) => {
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BASE_URL + "/evaluate/evaluateSteering/",
        "POST",
        JSON.stringify({ initativeID: steering.si.initativeID, grade }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      Swal.fire({
        icon: "success",
        title: "Correctly Evaluated",
      }).then(() => {
        navigate("/steeringlist");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong...",
        text: error.message,
      });
    }
  };
  useEffect(() => {
    const getSteering = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BASE_URL + "/evaluate/steeringInfo/" + id,
          "GET",
          null,
          { Authorization: "Bearer " + token }
        );
        console.log(response.steeringInfo);
        setSteering(response.steeringInfo);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    };
    getSteering();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <div className="container">
        <div class="mt-3 pt-3">
          <h2>Steering information</h2>
          <hr />
          {!isLoading && steering && (
            <div className="container">
              <div className="row">
                <div className="col-md-8 mt-3" style={{ fontSize: "large" }}>
                  <Icon name="user"></Icon>
                  <Label className="mt-2" color="teal" size="large">
                    Farmer
                  </Label>{" "}
                  {steering.si.farmer.mail}
                  <br />
                  <Icon name="user"></Icon>
                  <Label className="mt-2" color="teal" size="large">
                    Agronomist
                  </Label>{" "}
                  {steering.si.agronomist.email} <br />
                  <Icon name="map"></Icon>
                  <Label className="mt-2" color="facebook" size="large">
                    Location
                  </Label>{" "}
                  {steering.si.farmer.location.name}
                  {steering.si.grade && (
                    <React.Fragment>
                      <hr />
                      <Icon name="winner"></Icon>
                      <Label className="mt-2" color="green" size="large">
                        This initiative was evaluated as Positive
                      </Label>
                    </React.Fragment>
                  )}
                  <br />
                </div>
                <div className="col-md-4">
                  <LoadScript googleMapsApiKey="AIzaSyDX_OSdMYc79SeKrOLBh7VqZ5_n-mdexew">
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={9}
                    >
                      <></>
                    </GoogleMap>
                  </LoadScript>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 text-center mt-3 mb-3">
                    {/* if the steering was not previously evaluated and the report is available we do display the evaluate button */}
                    {!steering.si.grade && steering.report && (
                      <Button
                        className="mr-3"
                        color="green"
                        onClick={() => evaluate(1)}
                      >
                        Good Steering Initiative &nbsp;
                        <Icon name="thumbs up" />
                      </Button>
                    )}
                  </div>
                  <h2>Farmer productions report</h2>
                  {steering.report ? (
                    <React.Fragment>
                      {" "}
                      <p>
                        Production rates from <strong>two months before</strong>{" "}
                        the start of the steering initiative to
                        <strong>three months after</strong> the end od the
                        initiative itself.
                      </p>
                      <hr />
                      <div className="container">
                        <table class="ui celled table">
                          <thead>
                            <tr>
                              <th class="five wide text-center">
                                Production Rate Before
                              </th>
                              <th class="one wide text-center"></th>
                              <th class="five wide text-center">
                                Production Rate After
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* if we have a report available we display it */}
                            {steering.report &&
                              steering.report.map((r) => (
                                <tr
                                  className="text-center"
                                  style={{ fontSize: "1.2em" }}
                                >
                                  <td>
                                    <Label
                                      size="large"
                                      className="text-center mt-2"
                                    >
                                      {r.prodType.name}
                                    </Label>
                                    <br />
                                    &nbsp;
                                    {r.prodRateBefore} kg/month
                                  </td>
                                  <td>
                                    <Icon
                                      className="text-success mt-3"
                                      name="arrow circle right"
                                    ></Icon>
                                  </td>
                                  <td className="text-center mt-2">
                                    &nbsp;
                                    {r.prodRateAfter > r.prodRateBefore && (
                                      <React.Fragment>
                                        <Label
                                          size="large"
                                          color="green"
                                          className="text-center mt-2"
                                        >
                                          {r.prodType.name}
                                        </Label>
                                        <br />

                                        <strong className="text-success">
                                          {r.prodRateAfter} kg/month
                                        </strong>
                                      </React.Fragment>
                                    )}
                                    {r.prodRateAfter <= r.prodRateBefore && (
                                      <React.Fragment>
                                        <Label
                                          size="large"
                                          color="red"
                                          className="text-center mt-2 mr-2"
                                        >
                                          {r.prodType.name}
                                        </Label>
                                        <br />
                                        <strong className="text-danger pl-3">
                                          {r.prodRateAfter} kg/month
                                        </strong>
                                      </React.Fragment>
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </React.Fragment>
                  ) : (
                    // if we don't have a report available
                    <React.Fragment>
                      <Message color="teal">
                        <Message.Header>No data available</Message.Header>
                        <p>
                          Reports are available only{" "}
                          <strong>after three months</strong> after the starting
                          date of the steering initiative
                        </p>
                      </Message>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SteeringPage;
