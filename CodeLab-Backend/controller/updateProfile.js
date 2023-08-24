const Student = require('../models/userDetails');
const Teacher = require('../models/teachDetails');

// API for updating student profile
const updateStudentProfile = async (req, res) => {
  try {
    const { studentId, rollno, fname, email, password, sclass } = req.body;
    const updates = {};

    if (rollno) updates.rollno = rollno;
    if (fname) updates.fname = fname;
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (sclass) updates.sclass = sclass;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updates },
      { new: true }
    );

    res.send(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating student profile');
  }
};

// API for updating teacher profile
const updateTeacherProfile = async (req, res) => {
  try {
    const { teacherId, fname, email, password } = req.body;
    const updates = {};

    if (fname) updates.fname = fname;
    if (email) updates.email = email;
    if (password) updates.password = password;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $set: updates },
      { new: true }
    );

    res.send(updatedTeacher);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating teacher profile');
  }
};

module.exports = { updateStudentProfile, updateTeacherProfile };
