import logo from "./logo.svg";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import React from "react";
import authService from "./services/authService";
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import LandingPage from "./homepage/pages/LandingPage";
import Demo from "./homepage/pages/Demo";
import Login from "./auth/pages/LoginAdministrator";
import LoginPolicyMaker from "./auth/pages/LoginAdministrator";
import ListOfFarmers from "./policy/pages/FarmersList";
import FarmerPage from "./policy/pages/FarmerPage";
import SteeringPage from "./policy/pages/SteeringPage";
import SteeringList from "./policy/pages/SteeringsList";
import BadFarmersList from "./policy/pages/BadFarmersList";
require("dotenv").config();
const user = authService.getCurrentEmail();

function App() {
  const user = authService.getCurrentEmail();

  let routes;

  if (user) {
    routes = (
      // routes for logged user
      <Routes>
        <Route path="/" element={<ListOfFarmers />} />
        <Route path="/farmerpage/:id" element={<FarmerPage />} />
        <Route path="/steeringlist" element={<SteeringList />} />
        <Route path="/badfarmerslist" element={<BadFarmersList />} />
        <Route path="/steeringpage/:id" element={<SteeringPage />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    );
  } else {
    routes = (
      // routes for generic (unlogged) user
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/demo" element={<Demo />} />
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
