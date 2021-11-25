const express = require('express');
const PiCamera = require('pi-camera');
const { upload } = require('./drive');
const { port } = require('./config');

const app = express();

app.get('/celebrate', async (_req, res) => {
  console.log('celebrate request received');
  const myCamera = new PiCamera({
    mode: 'photo',
    output: `${ __dirname }/image.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
  });

  try {
    await myCamera.snap();

    const response = await upload();
    console.log(response)

    res.sendStatus(200);
  } catch(err) {
    console.error('something went wrong');
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port);
console.log('app listening..');
