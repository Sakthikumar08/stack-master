const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], default: "Single" },
  occupation: { type: String, default: "Not Specified" },
  height: { type: Number }, // in cm
  weight: { type: Number }, // in kg
  aadhaarNumber: { type: String, required: true, unique: true },
  linkedMobile: { type: String, required: true },
  medicalConditions: { type: [String], default: [] },
  allergies: { type: [String], default: [] },
  medications: { type: [String], default: [] }, // List of ongoing medications
  previousSurgeries: { type: [String], default: [] },
  vaccinations: { type: [String], default: [] }, // List of received vaccinations
  emergencyContact: {
    name: String,
    relation: String,
    phone: String,
  },
  healthID: { type: String, required: true, unique: true },
  smartHealthCardExpiry: { type: Date }, // Expiry date for Smart Health Card
  lastConsultation: { type: Date }, // Last consultation date
  doctorAssigned: { type: String, default: "Not Assigned" },
  insuranceSchemes: { type: [String], default: [] },
  governmentIDProofs: {
    panCard: { type: String },
    voterID: { type: String },
    drivingLicense: { type: String },
  },
  // New fields for OTP
  temporaryOTP: { type: String },
  otpExpiry: { type: Date },
  // Medical Records Schema
  medicalRecords: [{
    date: { type: Date, required: true },
    doctor: { type: String, required: true },
    disease: { type: String, required: true },
    medicine: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Patient", PatientSchema);
