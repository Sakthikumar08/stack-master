import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/home-page/Home";
import Patient from "./Component/patient-dashborad/Patient";
import Government from "./Component/government-dashboard/Government";
import Doctor from "./Component/doctor-dashboard/Doctor";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/government" element={<Government />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient/*" element={<Patient />} />
      </Routes>
    </Router>
  );
};

export default App;
