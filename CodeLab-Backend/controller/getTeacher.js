const Teacher = require("../models/teachDetails");

const getTeacherDetails = async (req, res) => {
  try {
    const { email } = req.body;

    const teacher = await Teacher.findOne({email: email});

    if (!teacher) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ teacher });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving student details" });
  }
};

module.exports = { getTeacherDetails };
