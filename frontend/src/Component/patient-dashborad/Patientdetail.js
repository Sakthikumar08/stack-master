import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Patientrecords from "./Patientrecords";

const Patientdetail = () => {
  const location = useLocation();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Retrieve patient data from either location state or localStorage
    const storedData = location.state?.patient || JSON.parse(localStorage.getItem("patientData"));
    console.log("hi")
    console.log(storedData);
    if (storedData) {
      setPatient(storedData);
      console.log("hi")
      console.log(storedData);
    } else {
      console.error("No patient data found");
    }
  }, [location.state]);

  if (!patient) return <h2>No patient found</h2>;

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>👤 Name:</strong> {patient.fullName}</p>
      
      <p><strong>📧 Email:</strong> {patient.email}</p>
      <p><strong>🆔 Aadhaar:</strong> {patient.aadhaarNumber}</p>
      <p><strong>📌 Gender:</strong> {patient.gender}</p>
      <p><strong>📌 Blood Group:</strong> {patient.bloodGroup}</p>
      <p><strong>📌 Contact:</strong> {patient.contactNumber}</p>
      <p><strong>📧 Email:</strong> {patient.email}</p>
      <p><strong>🏠 Address:</strong> {patient.address?.street}, {patient.address?.city}, {patient.address?.state}, {patient.address?.pincode}, {patient.address?.country}</p>
      <p><strong>💼 Occupation:</strong> {patient.occupation}</p>
      <p><strong>📏 Height:</strong> {patient.height} cm</p>
      <p><strong>⚖ Weight:</strong> {patient.weight} kg</p>
      <p><strong>🆔 Aadhaar:</strong> {patient.aadhaarNumber}</p>
      <p><strong>📱 Linked Mobile:</strong> {patient.linkedMobile}</p>
      <p><strong>💊 Medical Conditions:</strong> {patient.medicalConditions.join(", ")}</p>
      <p><strong>🤧 Allergies:</strong> {patient.allergies.join(", ")}</p>
      <p><strong>💊 Medications:</strong> {patient.medications.join(", ")}</p>
      <p><strong>🏥 Previous Surgeries:</strong> {patient.previousSurgeries.join(", ")}</p>
      <p><strong>💉 Vaccinations:</strong> {patient.vaccinations.join(", ")}</p>
      <p><strong>👨‍⚕ Doctor Assigned:</strong> {patient.doctorAssigned}</p>
      <p><strong>📅 Last Consultation:</strong> {new Date(patient.lastConsultation).toLocaleDateString()}</p>
      <p><strong>🩺 Smart Health Card Expiry:</strong> {new Date(patient.smartHealthCardExpiry).toLocaleDateString()}</p>
      <p><strong>📄 Insurance Schemes:</strong> {patient.insuranceSchemes.join(", ")}</p>
      <p><strong>📜 Government ID Proofs:</strong> PAN: {patient.governmentIDProofs?.panCard}, Voter ID: {patient.governmentIDProofs?.voterID}, DL: {patient.governmentIDProofs?.drivingLicense}</p>
      <p><strong>🚨 Emergency Contact:</strong> {patient.emergencyContact?.name} ({patient.emergencyContact?.relation}) - {patient.emergencyContact?.phone}</p>
     
      <Patientrecords aadhaarNumber={patient.aadhaarNumber} />
    </div>

  );
};

export default Patientdetail;