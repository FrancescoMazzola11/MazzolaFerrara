import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
// import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../util/http-hook";
import Swal from "sweetalert2";

const NavBar = () => {
  const { sendRequest, isLoading } = useHttpClient();
   const user = authService.getCurrentEmail();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getOrdini = async () => {
  //     if (user) {
  //       try {
  //         const response = await sendRequest(
  //           process.env.REACT_APP_JAVA_BASE_URL +
  //             "/order/unpaidOrders/" +
  //             authService.getCurrentId(),
  //           "GET",
  //           null
  //         );
  //         setnOrdersUnpaid(response.length);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   getOrdini();
  // }, [sendRequest]);


  return (
    <Navbar bg="blue" expand="lg">
      <Container>
        {/* className=" bg-opacity-100 bg-light rounded-pill text-light" */}
        <Navbar.Brand href="/">
          <img
            alt=""
            width="35"
            height="35"
            src="/logo.jpeg"
            className="d-inline-block align-end rounded-pill"
          />
          {"Telcom"}
        </Navbar.Brand>{" "}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
              {/* <FontAwesomeIcon className="fa-lg" icon={faHome} /> */}
              {"Homepage"}
            </Nav.Link>
            {user === "Emp" && (
              <React.Fragment>
                <Nav.Link href="/optionals">Optionals</Nav.Link>
                <Nav.Link href="/salesReport">Sales Report</Nav.Link>
              </React.Fragment>
            )}

          </Nav>
          <Nav>
            {user ? (
              <React.Fragment>
                <Nav.Link
                  className="right-align btn-light rounded-0 text-dark pl-3 pr-3"
                  style={{ marginLeft: 5 }}
                  href="/"
                >
                  Welcome back {user}
                </Nav.Link>
                <Nav.Link
                  className="right-align btn btn-dark rounded-pill text-light pl-3 pr-3"
                  style={{ marginLeft: 5 }}
                  onClick={() => {
                    authService.logout();
                    navigate(0);
                  }}
                >
                  Logout{" "}
                </Nav.Link>
              </React.Fragment>
            ) : (
              <Nav.Link
                className="right-align btn rounded-pill text-light pl-3 pr-3"
                style={{ marginLeft: 5, color: "white", backgroundColor: "#3b5998" }}
                href="/login"
              >
                &nbsp;Log-in / Sign-up &nbsp;
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
