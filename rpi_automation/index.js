const express = require('express');
const PiCamera = require('pi-camera');
const { upload } = require('./drive');
const { port } = require('./config');

const imagePath = `${ __dirname }/image.jpg`;
const myCamera = new PiCamera({
  mode: 'photo',
  output: imagePath,
  width: 640,
  height: 480,
  nopreview: true,
});

const app = express();

app.get('/celebrate', async (_req, res) => {
  console.log('celebrate request received');
  try {
    await myCamera.snap();
    console.log('celebrate photo taken');
    const uploadResponse = await upload(imagePath);
    console.log('celebrate photo uploaded');
    res.send(uploadResponse);
  } catch(err) {
    console.error('something went wrong', err);
    res.sendStatus(500);
  }
});

app.listen(port);
console.log(`app listening on port: ${port}`);
