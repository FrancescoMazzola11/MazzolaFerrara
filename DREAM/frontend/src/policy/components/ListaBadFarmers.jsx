import React, { useState } from "react";

import Farmer from "./Production";
import { Form, Card, Button, Icon, Modal, Label, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListaBadFarmers = (props) => {
  const [open, setOpen] = useState(false);

  if (props.farmers.length === 0) {
    return (
      <div className="mx-0 justify-content-center">
        Nessun bad farmer presente in DREAMS
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          style={{ position: "relative", height: "auto"}}
        >
          <Modal.Header className="text-center">
            Assign farmer to a new steering initiative
          </Modal.Header>
          <Modal.Content scrolling style={{ position: "relative", height: "25vh"}}>
            <Modal.Description>
              <Form>
                <Label>Select agronomist for the steering initiative</Label>
                <Dropdown
                  placeholder="Select agronomist"
                  fluid
                  search
                  selection
                  options={props.agronomists}
                  
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <div className=" my-2 mx-3">
          <table class="ui celled table">
            <thead>
              <tr>
                <th class="ten wide text-center">Farmer</th>
                <th class="three wide text-center">
                  <Icon size="large" name="add user" />
                </th>
              </tr>
            </thead>
            <tbody>
              {props.farmers.map((farmer) => (
                <tr>
                  <td className="text-center mt-3 pt-3 justify-content-center">
                    {farmer.mail}
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
              ))}
            </tbody>
          </table>
        </div>

        <br></br>
      </React.Fragment>
    );
  }
};
export default ListaBadFarmers;
