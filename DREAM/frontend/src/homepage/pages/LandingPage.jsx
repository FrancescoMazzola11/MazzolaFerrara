import React, { useState, useEffect } from "react";
import { Button, } from "semantic-ui-react";


// import Swal from "sweetalert2";


const LandingPage = () => {

  return (
    <React.Fragment>
      <div className="container">
      <div class="d-flex justify-content-center mt-3 pt-3">
        <h2 className="display-4">
          Welcome to <span className="text-success">DREAMS</span>
        </h2>
      </div>
      <div class="d-flex justify-content-center mt-3 pt-3">
        <h3>
          Improve your production and learn new techniques on our platform
        </h3>
      </div>
              </div>
              <center>
                <Button href="/login" className="mt-4" color="green">
                  &nbsp;LOG-IN&nbsp;
                </Button>
              </center>
    </React.Fragment>
  );
};

export default LandingPage;
