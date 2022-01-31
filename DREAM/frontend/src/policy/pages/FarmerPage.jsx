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
  useEffect(() => {
    const getFarmer = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/farmer/" + id,
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
                  <li>Email: farmer.email }</li>
                  <li>Location: farmer.location.name } </li>
                  <li>Production Types: farmer}</li>
                  {/* get list of production types of the farmer */}
                </ul>
              </div>
              <div className="col-md-4">
                <div id="map">
                  {/* api di google per le mappe da una data location */}
                </div>
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
                        <h4 className="ml-2 pl-3 mt-3">
                          <Label color="teal" size="large">
                            Production Type
                          </Label>{" "}
                          Rice
                          <br />
                          <Label color="teal" size="large">
                            Production Qty.
                          </Label>{" "}
                          10
                        </h4>
                      </div>
                      <div className="col-5 mb-2 mt-2">
                        <Label className="mb-1" size="large">Problems</Label>
                        <Form>
                          <TextArea
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
