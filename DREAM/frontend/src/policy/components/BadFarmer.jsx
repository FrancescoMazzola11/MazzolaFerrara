import React, { useState } from "react";

import Farmer from "./Production";
import {
  Form,
  Card,
  Button,
  Icon,
  Modal,
  Label,
  Dropdown,
} from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../util/http-hook";
import authService from "../../services/authService";
import Swal from "sweetalert2";

const BadFarmer = (props) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [open, setOpen] = useState(false);
  const [agronomist, setAgronomist] = useState();
  const token = authService.getCurrentToken();
  const navigate = useNavigate();

  const createSteering = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BASE_URL + "/steering/createSteering",
        "POST",
        JSON.stringify({
          farmerID: props.farmer.id,
          agronomistID: agronomist,
        }),
        { "Content-Type": "application/json", Authorization: "Bearer " + token }
      );
      Swal.fire({
        icon: "success",
        title: "Steering initiative created!",
      }).then(() => setOpen(false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong...",
        text: error.message,
      });
    }
  };

  return (
    <React.Fragment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ position: "relative", height: "auto" }}
      >
        <Modal.Header className="text-center">
          Assign farmer to a new steering initiative
        </Modal.Header>
        <Modal.Content
          scrolling
          style={{ position: "relative", height: "25vh" }}
        >
          <Modal.Description>
            <Form>
              <Label>Select agronomist for the steering initiative</Label>
              <Dropdown
                placeholder="Select agronomist"
                fluid
                search
                selection
                options={props.agronomists}
                onChange={(e, data) => setAgronomist(data.value)}
              />
              <Button
                disabled={!agronomist}
                color="red"
                className="mt-3"
                floated="right"
                onClick={() => createSteering()}
              >
                Create steering
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <tr>
        <td className="text-center mt-3 pt-3 justify-content-center">
          {props.farmer.mail}
        </td>
        <td className="text-center">
          <Button
            onClick={() => setOpen(true)}
            className=" btn btn-danger text-decoration-none"
            activeClassName="active"
            style={{ backgroundColor: "red", color: "white" }}
          >
            Assign farmer
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default BadFarmer;
