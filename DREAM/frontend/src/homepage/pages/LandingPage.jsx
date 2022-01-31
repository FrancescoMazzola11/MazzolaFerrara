import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";


import Swal from "sweetalert2";


const LandingPage = () => {
  //query al database per ottenere i pacchetti



  return (
    <React.Fragment>
      {/* usare un component in cui importare i dati per formattarli nel frontend */}
      <div className="jumbotron">
        <div className="container mt-2">
          <h1 className="display-5">WELCOME TO TELCOM</h1>
          <p className="">The newest company for mobile and fixed telehone! </p>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

          <hr />
          <h3 className="mt-3">HAVE A LOOK TO OUR &nbsp;
          <mark className="bg-danger text-light">
          NEWEST
          PACKAGES
          </mark>
           </h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
