import React, { useState } from "react";

import { useFormik } from "formik";
import { Form, Card, Button, Icon, Header } from "semantic-ui-react";
import Swal from "sweetalert2";
import * as Yup from "yup";

import { useHttpClient } from "../../util/http-hook";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

const loginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const LoginAdministrator = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const navigate = useNavigate();

  const loginData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_JAVA_BASE_URL + "/login",
          "POST",
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        authService.login(
          responseData.id,
          responseData.email,
          responseData.token,
        );
        navigate("/");
        navigate(0);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong...",
          text: error.message,
        });
      }
    },
  });
  return (
    <React.Fragment>
      <div className="container mt-2">
        {!isLoading && (
          <div style={{ margin: "10%" }}>
            <Card color="green" centered fluid>
              <Card.Header>
                <Header as="h2" className="text-center my-3">
                  LOGIN AS A POLICY MAKER
                </Header>
              </Card.Header>
              <Card.Content>
                <Form size="large">
                  <Form.Input
                    label="E-Mail:"
                    id="email"
                    value={loginData.values.email}
                    onChange={loginData.handleChange}
                    onBlur={loginData.handleBlur}
                    error={
                      loginData.errors.email && loginData.touched.email
                    }
                  />
                  <Form.Input
                    label="Password:"
                    id="password"
                    type="password"
                    value={loginData.values.password}
                    onChange={loginData.handleChange}
                    onBlur={loginData.handleBlur}
                    error={
                      loginData.errors.password && loginData.touched.password
                    }
                  />
                  <Button
                    type="submit"
                    color="green"
                    floated="right"
                    className="rounded-pill" 
                    onClick={loginData.handleSubmit}
                  >
                    <Icon name="sign in" /> LOG-IN
                  </Button>
                </Form>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginAdministrator;
