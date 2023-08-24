const Student = require('../models/userDetails');

const getAssignments = async (req, res) => {
  try {
    const { labId, studentId } = req.body;
    const student = await Student.findOne({ _id: studentId });

    if (!student) {
      throw new Error('Student not found');
    }

    const lab = student.labs.find((labObj) => labObj.labId.toString() === labId.toString());

    if (!lab) {
      throw new Error('Lab not found for the student');
    }

    const assignments = lab.assignments;

    if (assignments.length === 0) {
      throw new Error('No assignments found for the lab');
    }

    res.json({
      studentId: student._id,
      assignments
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error retrieving assignments' });
  }
};

module.exports = { getAssignments };
