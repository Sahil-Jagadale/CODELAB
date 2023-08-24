const axios = require('axios');
const Submission = require('../models/submission');

const executeCode = (req, res) => {
  const {script, language, versionIndex,inputs } = req.body;

  const payload = {
    clientId:'38ce9bb78a0b998cd56b8fde165b0108',
    clientSecret:'3821157720d8b1af4f49cce5b7a2bae41a0c0139756014734112f49e8109dee3',
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
