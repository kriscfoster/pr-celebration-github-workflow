const express = require('express');
const { upload } = require('./drive');
const { takePhoto } = require('./camera');
const { port, authorizationToken } = require('./config');

const app = express();

app.get('/celebrate', async (req, res) => {
  console.log('celebrate request received');
  try {
    const token = req.headers.authorization;
    if (token != authorizationToken) {
      console.log('request unauthorized');
      return res.sendStatus(401);
    }

    console.log('taking celebrate photo');
    await takePhoto();
    console.log('celebrate photo taken');
    const uploadResponse = await upload();
    console.log('celebrate photo uploaded');
    res.send(uploadResponse);
  } catch(err) {
    console.error('something went wrong', err);
    res.sendStatus(500);
  }
});

app.listen(port);
console.log(`app listening on port: ${port}`);
