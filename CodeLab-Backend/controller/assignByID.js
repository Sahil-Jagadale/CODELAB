const Assignment = require("../models/assignmentDetails");

const getAssignmentDetails = async (req, res) => {
  const { assignId } = req.body;

  try {
    const assign = await Assignment.findById({_id: assignId});
    
    if (!assign) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json({ assign });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAssignmentDetails };

