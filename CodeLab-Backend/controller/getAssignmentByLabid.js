const Labs = require("../models/labsDetails");
const Assignment = require("../models/assignmentDetails");

const getAllAssignmentDetailsByLabId = async (req, res) => {
  const { labId } = req.body;

  try {
    const lab = await Labs.findOne({ _id: labId }).populate('assignments');

    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    const assignments = lab.assignments;

    res.json({ assignments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllAssignmentDetailsByLabId };
