import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientnavStyle.css";
import profile from "../../assets/pass.jpg";

const Patientnav = () => {
  const navigate = useNavigate();
  const aadhaar = localStorage.getItem("aadhaar"); // Get Aadhaar from storage

  return (
    <div className="navbar">
      <div className="profile-pic">
        <img src={profile} alt="Profile" />
      </div>
      <nav>
        <button 
          onClick={() => navigate(`/patient/detail`, { replace: true })}
          disabled={!aadhaar} // Disable if Aadhaar not found
        >
          Details
        </button>
       

        <button onClick={() => {
          localStorage.removeItem("aadhaar"); // Clear Aadhaar on logout
          navigate("/");
        }}>
          LogOut
        </button>
      </nav>
    </div>
  );
};

export default Patientnav;
