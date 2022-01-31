import logo from './logo.svg';
import './App.css';
import NavBar from "./shared/components/NavBar";
import Footer from "./shared/components/Footer";
import LandingPage from "./homepage/pages/LandingPage";
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
const user = authService.getCurrentRuolo();

function App() {
  let routes;
  const user = authService.getCurrentRuolo();


  if (user) {
      routes = (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/packagedetails/:pkgID" element={<PackagePage />} />
          <Route path="/liststeeringinitiatives" element={<SteeringInitiatives />} />
          <Route path="/evaluatesteeringinitiative/:initativeID" element={<EvaluateSteering />} /> */}
        </Routes>
      );
  } else {
    routes = (
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/loginpolicymaker" element={<LoginPolicyMaker />} />
        <Route path="/packagedetails/:pkgID" element={<PackagePage />} /> */}
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
