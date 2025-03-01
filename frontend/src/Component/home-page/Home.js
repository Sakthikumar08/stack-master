import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeStyle.css";

const Home = () => {
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [patientData, setPatientData] = useState(null);

  const requestOTP = async () => {
    if (aadhaar.trim().length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar Number.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/patient/${aadhaar}`);
      const data = await response.json();
      if (!response.ok) {
        alert("Invalid Aadhaar Number. Patient not found.");
        return;
      }
      alert(`OTP has been sent to ${data.email}`);
      setOtpSent(true);
      setShowAadhaarModal(false);
      setShowOtpModal(true);
    } catch (error) {
      console.error("Error requesting OTP:", error);
      alert("Server error. Please try again.");
    }
  };

  const verifyOTP = async () => {
    if (otp.trim().length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/patient/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: aadhaar, otp }),
      });
  
      const data = await response.json();
      console.log("Full Patient Data:", data);
  
      if (!response.ok) {
        alert(data.message || "Patient not found");
        return;
      }
  
      alert("OTP Verified Successfully!");
  
      // Store the **entire** patient object in localStorage
      localStorage.setItem("patientData", JSON.stringify(data.patient));
  
      // Navigate to Patient Detail page & pass state
      navigate(`/patient/detail`, { state: { patient: data.patient } });
   /*    navigate(`/patient/records`, { state: { record: data.patient } }); */

  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Server error. Please try again.");
    }
  };
  
  
  

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Aadhaar-Linked Smart Health Record System</h1>
      </header>
    
        
        <div className="dashboard-cards">
        <div className="card government-dashboard" onClick={() => navigate("/government")}>
          <h2>Government Dashboard</h2>
          <p>Access healthcare analytics and insights.</p>
        </div>
        <div className="card doctor-dashboard" onClick={() => navigate("/doctor")}>
          <h2>doctor Dashboard</h2>
          <p>upload the health report of patient.</p>
        </div>
        <div className="card patient-dashboard" onClick={() => setShowAadhaarModal(true)}>
          <h2>Patient Dashboard</h2>
          <p>View and manage personal health records.</p>
        </div>

      </div>

      {showAadhaarModal && (
        <div className="modal">
          <div className="modal-content" style={{width:"400px",alignItems:"center"}}>
            <h3>Enter Aadhaar Number</h3>
            <input type="text" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} maxLength={12} />
            <button onClick={requestOTP}>Request OTP</button>
            <button onClick={() => setShowAadhaarModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showOtpModal && otpSent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter OTP</h3>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
            <button onClick={verifyOTP}>Verify OTP</button>
            <button onClick={() => setShowOtpModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
