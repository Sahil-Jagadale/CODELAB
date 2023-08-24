// forgotPassword.js

const nodemailer = require("nodemailer");
const Student = require("../models/userDetails");
const Teacher = require("../models/teachDetails");
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'e2ea0706',
  apiSecret: '12WErJXSSe9gHsJw',
});

const generateOTP = () => {
  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

const sendOTP = async (email, otp) => {
  // Use nodemailer or your preferred email service provider to send the OTP to the user's email
  // Example using nodemailer:
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'viratdandawane@gmail.com',
      pass: 'viratkohli@18',
    },
  });

  const mailOptions = {
    from: "viratdandawane@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

const generateAndSendOTP = async (req, res) => {
  const { email, userType } = req.body;

  try {
    let User;

    if (userType === "student") {
      User = Student;
    } else if (userType === "teacher") {
      User = Teacher;
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendOTP(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error generating and sending OTP" });
    console.log(error);
  }
};

module.exports = {generateAndSendOTP};
