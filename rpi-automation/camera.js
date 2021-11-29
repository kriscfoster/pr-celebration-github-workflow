const PiCamera = require('pi-camera');
const player = require('play-sound')(opts = {})
const { imagePath } = require('./config');

const myCamera = new PiCamera({
  mode: 'photo',
  output: imagePath,
  width: 640,
  height: 480,
  nopreview: true,
});

async function takePhoto() {
  player.play('./start.wav', async () => {
    await myCamera.snap();
  });

}

module.exports = {
  takePhoto,
};
