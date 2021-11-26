const PiCamera = require('pi-camera');
const { imagePath } = require('./config');

const myCamera = new PiCamera({
  mode: 'photo',
  output: imagePath,
  width: 640,
  height: 480,
  nopreview: true,
});

async function takePhoto() {
  await myCamera.snap();
}

module.exports = {
  takePhoto,
};
