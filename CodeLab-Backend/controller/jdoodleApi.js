const axios = require('axios');
const Submission = require('../models/submission');

const executeCode = (req, res) => {
  const {script, language, versionIndex,inputs } = req.body;

  const payload = {
    clientId: process.env.jdoodlecid,
    clientSecret: process.env.jdoodlecsc,
    script,
    language,
    versionIndex,
    stdin: inputs
  };

  axios.post('https://api.jdoodle.com/v1/execute', payload)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Error executing code');
    });
}

module.exports = { executeCode };
