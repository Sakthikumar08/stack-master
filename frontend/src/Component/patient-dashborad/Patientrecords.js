import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientrecordStyle.css"; // Ensure you have a CSS file for styling

const Patientrecords = ({ aadhaarNumber }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);  // Start loading
    try {
      const response = await fetch(`http://localhost:5001/api/patient/${aadhaarNumber}/medical-records`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error fetching records");
      }
      setRecords(data);
    } catch (error) {
      setError("Error fetching records: " + error.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (aadhaarNumber) {
      fetchRecords();
    }
  }, [aadhaarNumber]);  // Dependency array ensures this runs when aadhaarNumber changes

  if (loading) return <p>Loading medical records...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="patient-records">
      <h2>Medical Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Doctor Name</th>
            <th>Disease</th>
            <th>Medicine Used</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.doctor}</td>
                <td>{record.disease}</td>
                <td>{record.medicine}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No medical records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Patientrecords;