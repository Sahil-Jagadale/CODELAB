const Submission = require("../models/submission");

const getSubmissionDetails = async (req, res) => {
  try {
    const { email, assignmentId } = req.body;

    const submission = await Submission.findOne({ email, assID: assignmentId });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    res.json({ submission });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving submission details" });
  }
};

module.exports = { getSubmissionDetails };
