const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const nodemailer = require("nodemailer");

// Generate OTP Function
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP via Email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummyacchackindia@gmail.com",
      pass: "vppxqydjalhnczyp",
    },
  });

  const mailOptions = {
    from: "dummyacchackindia@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text:` Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

// Route to request OTP
router.get("/:aadhaarNumber", async (req, res) => {
  try {
    const patient = await Patient.findOne({ aadhaarNumber: req.params.aadhaarNumber });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

    patient.temporaryOTP = otp;
    console.log(otp)
    patient.otpExpiry = expiryTime;
    await patient.save();

    const emailSent = await sendOTP(patient.email, otp);

    if (emailSent) {
      res.json({ message: "OTP sent successfully", email: patient.email });
    } else {
      res.status(500).json({ message: "Failed to send OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to verify OTP
router.post("/verify-otp", async (req, res) => {
  const { aadhaarNumber, otp } = req.body;

  try {
    const patient = await Patient.findOne({ aadhaarNumber });

    if (!patient || patient.temporaryOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > patient.otpExpiry) {
      return res.status(400).json({ message: "OTP expired. Please request a new one." });
    }

    patient.temporaryOTP = null;
    patient.otpExpiry = null;
    await patient.save();
   
    res.json({ message: "OTP verified successfully", patient });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
