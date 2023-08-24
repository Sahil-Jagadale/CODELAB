const Lab = require("../models/labsDetails");

const getlab = async(req,res) => {
    Lab.find()
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: 'Failed to fetch data'}));
}

module.exports = {getlab}