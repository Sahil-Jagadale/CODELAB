const Student = require("../models/userDetails");

const getStudentDetails = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({email: email});

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving student details" });
  }
};

module.exports = { getStudentDetails };
