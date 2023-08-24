const Lab = require("../models/labsDetails");

const getLabDetails = async (req, res) => {
    const { labId } = req.body;

  try {
    const lab = await Lab.findById({_id: labId});
    
    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    res.json({ lab });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getLabDetails };
