const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.get("/:aadhaarNumber/medical-records", async (req, res) => {
    console.log("Received request for:", req.params.aadhaarNumber);
    
    try {
      const { aadhaarNumber } = req.params;
      const patient = await Patient.findOne({ aadhaarNumber });
  
      if (!patient) {
        console.log("Patient not found");
        return res.status(404).json({ message: "Patient not found" });
      }
  
      console.log("Returning medical records");
      res.json(patient.medicalRecords);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      res.status(500).json({ message: "Internal Server Error", error });
    }
  });
  

// Add a new medical record
router.post("/:aadhaarNumber/medical-records", async (req, res) => {
  try {
    const { aadhaarNumber } = req.params;
    const { date, doctor, disease, medicine } = req.body;

    const patient = await Patient.findOne({ aadhaarNumber });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.medicalRecords.push({ date, doctor, disease, medicine });
    await patient.save();

    res.status(201).json({ message: "Medical record added successfully", medicalRecords: patient.medicalRecords });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
