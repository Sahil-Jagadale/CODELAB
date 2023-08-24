const axios = require('axios');
const Submission = require('../models/submission');
const UserInfo = require('../models/userDetails');
const AssignmentDetails = require('../models/assignmentDetails');

const generateSubmissionId = () => {
  return Math.floor(Math.random() * 1000000) + 1;
};

const executeCode = (req, res) => {
  const { script, language, versionIndex, inputs } = req.body;

  const payload = {
    clientId: process.env.cid,
    clientSecret: process.env.secret,
    script,
    language,
    versionIndex,
    stdin: inputs,
  };

  axios
    .post('https://api.jdoodle.com/v1/execute', payload)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send('Error executing code');
    });
};


const saveCode = async (req, res) => {
  const { code, email } = req.body;

  try {
    const student = await UserInfo.findOne({ email });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    let submission;

    const existingSubmission = student.labs[0].assignments.find(
      (assignment) => assignment.submissionId !== null
    );

    if (existingSubmission) {
      existingSubmission.code = code;
      submission = existingSubmission;
      await Submission.findOneAndUpdate(
        { submissionId: existingSubmission.submissionId },
        { code },
        { new: true }
      );
    } else {
      const newSubmissionId = generateSubmissionId();

      const newAssignment = {
        code,
        status: 1,
        graded: 0,
        marks: null,
        submissionId: newSubmissionId,
      };

      student.labs[0].assignments.push(newAssignment);
      submission = newAssignment;

      const newSubmission = new Submission({
        submissionId: newSubmissionId,
        code,
      });
      await newSubmission.save();
    }

    await student.save();

    res.send({ submissionId: submission.submissionId });
  } catch (error) {
    res.status(500).send('Error saving code');
  }
};


const submitCode = async (req, res) => {
  const { code, input, output, email, assID } = req.body;

  try {
    const student = await UserInfo.findOne({ email });

    if (!student) {
      return res.status(404).send('Student not found');
    }

    const assignment = await AssignmentDetails.findById(assID);

    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }

    const newSubmissionId = generateSubmissionId();

    const newSubmission = new Submission({
      submissionId: newSubmissionId,
      code,
      input,
      output,
      email,
      assID,
    });

    await newSubmission.save();

    assignment.students.push(student._id);


    const assignmentIndex = student.labs[0].assignments.findIndex(
      (assignment) => assignment.asigid && assignment.asigid.toString() === assID.toString()
    );

    if (assignmentIndex !== -1) {
      student.labs[0].assignments[assignmentIndex].submissionId = newSubmissionId;
      student.labs[0].assignments[assignmentIndex].status = 1;
    } else {
      const newAssignment = {
        asigid: assID,
        status: 1,
        graded: 0,
        marks: null,
        submissionId: newSubmissionId,
      };
      student.labs[0].assignments.push(newAssignment);
    }

    await assignment.save();
    await student.save();

    res.send({ submissionId: newSubmissionId });
  } catch (error) {
    res.status(500).send('Error submitting code');
  }
};



module.exports = { executeCode, saveCode, submitCode };
