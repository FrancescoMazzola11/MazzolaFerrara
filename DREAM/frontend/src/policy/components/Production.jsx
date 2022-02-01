import { FontAwesomeIcon } from "@fortawesome/fontawesome-free";
import React from "react";
import { Form, Card, Button, Icon, TextArea, Label } from "semantic-ui-react";
const Farmer = (props) => {
  return (
    <Card className="w-100 mt-1 mb-3" color="grey">
      <div className="row">
        <div className="col-1 pl-3 text-center"></div>
        <div className="col-5 pl-3 text-left">
          <h4 className="ml-2 pl-3 mt-4 justify-content-center">
            <Label className="mt-3" color="teal" size="large">
              Production Type
            </Label>{" "}
            {props.production.prodType.name}
            <br />
            <Label className="mt-3" color="teal" size="large">
              Production Qty.
            </Label>{" "}
            {props.production.amount} kg
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
              placeholder={props.production.problem}
            />
          </Form>
        </div>
        <div className="col-12 mt-3 mb-3 pl-4">
          <hr />
          &nbsp;
          <Icon size="large" name="calendar">
            {" "}
          </Icon>
          Production Date: &nbsp;
          <strong>{props.production.date}</strong>
          &nbsp;
          <span className="text-muted">
          (in {props.production.period} month/s)
            </span>
        </div>
      </div>
    </Card>
  );
};

export default Farmer;
