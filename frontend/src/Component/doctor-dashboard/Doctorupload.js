import React, { useState } from "react";
import axios from "axios";
import "./DoctoruploadStyle.css";

const DoctorUpload = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [disease, setDisease] = useState("");
  const [medicine, setMedicine] = useState("");
  const [message, setMessage] = useState(null);

  const handleAadhaarSubmit = (e) => {
    e.preventDefault();
    if (aadhaarNumber) {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5001/api/patient/${aadhaarNumber}/medical-records`,
        { date, doctor, disease, medicine }
      );
      setMessage(response.data.message);

      // Clear input fields after successful submission
      setDate("");
      setDoctor("");
      setDisease("");
      setMedicine("");

    } catch (error) {
      setMessage("Failed to upload record");
    }
  };

  return (
    <div className="doctor-upload-container">
      <h2>Doctor Report Upload</h2>
      {!showForm ? (
        <form onSubmit={handleAadhaarSubmit} className="aadhaar-form">
          <input
            type="text"
            placeholder="Enter Aadhaar Number"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
          />
          <button type="submit">Proceed</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="medical-form">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="text" placeholder="Doctor Name" value={doctor} onChange={(e) => setDoctor(e.target.value)} required />
          <input type="text" placeholder="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} required />
          <input type="text" placeholder="Medicine" value={medicine} onChange={(e) => setMedicine(e.target.value)} required />
          <button type="submit">Upload Record</button>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DoctorUpload;
