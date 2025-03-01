import React from "react";
import { Routes, Route } from "react-router-dom";
import Patientnav from "./Patientnav";
import Patientdetail from "./Patientdetail";
import Patientrecords from "./Patientrecords";
import "./PatientStyle.css";

const Patient = () => {
  return (
    <div className="patient-container">
      <Patientnav />

      <div className="content">
        <Routes>
        <Route path="detail" element={<Patientdetail />} />
        <Route path="records/:aadhaarNumber" element={<Patientrecords />} />
        
        </Routes>
      </div>
    </div>
  );
};

export default Patient;
