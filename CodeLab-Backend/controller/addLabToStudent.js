const Labs = require("../models/labsDetails");
const Student = require("../models/userDetails");

const addLabToStudent = async (req, res) => {
  const { email, labId } = req.body;
  const labcreated = await Labs.findOne({ _id: labId });

  try {
    const student = await Student.findOne({email: email});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.labs.push({ labId });

    await student.save();

    res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addLabToStudent };