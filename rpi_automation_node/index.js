const PiCamera = require('pi-camera');
const express = require('express');

const app = express();

app.get('/celebrate', async (req, res) => {
  const myCamera = new PiCamera({
    mode: 'photo',
    output: `${ __dirname }/image.jpg`,
    width: 640,
    height: 480,
    nopreview: true,
  });

  try {
    await myCamera.snap();
    res.sendStatus(200);
  } catch(err) {
    console.error('something went wrong');
    console.error(error);
    res.sendStatus(500);
  }
});
