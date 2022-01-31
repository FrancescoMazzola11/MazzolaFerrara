import logo from './logo.svg';
import './App.css';
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import React from "react";
import authService from "./services/authService"

import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import LandingPage from "./homepage/pages/LandingPage";


function App() {
  const user = authService.getCurrentRuolo();

  let routes;

  if (user) {
      routes = (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/packagedetails/:pkgID" element={<PackagePage />} />
          <Route path="/confirmationpage" element={<ConfirmationPage />} />
          <Route path="/unpaidorders" element={<UnpaidOrders />} /> */}
        </Routes>
      );
  } else {
    routes = (
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }
  return (
    <Router>
      <NavBar />
      <main>{routes}</main>
      <Footer />
    </Router>
  );
}

export default App;
