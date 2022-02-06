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
                <Button href="/login" className="mt-4 btn-success">&nbsp;LOG-IN&nbsp;
                </Button>
              </center>
    </React.Fragment>
  );
};

export default LandingPage;
