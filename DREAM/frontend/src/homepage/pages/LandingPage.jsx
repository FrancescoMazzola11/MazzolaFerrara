import React, { useState, useEffect } from "react";
import { Image, Button } from "react-bootstrap";


// import Swal from "sweetalert2";


const LandingPage = () => {

  return (
    <React.Fragment>
      <div className="container">
      <div class="d-flex justify-content-center mt-3 pt-3">
        <h2>
          Welcome to DREAMS
        </h2>
      </div>
      <div class="d-flex justify-content-center mt-3 pt-3">
        <h3>
          Improve your production and learn new techniques on our platform
        </h3>
      </div>
              </div>
              <center>
              <div className="jumbotron">
              <Button href="/login" className="btn mt-3 mb-3 btn-success"> Log-In / Sign-Up</Button>
              <br/>
              <br/>
              <img class="mb-0" width="100%" src="https://lacerba.io/assets/gradient-scolarship.png" alt=""/>
              </div>
              </center>
    </React.Fragment>
  );
};

export default LandingPage;
