const PiCamera = require('pi-camera');
const soundplayer = require('sound-player');
const { imagePath } = require('./config');

const soundPlayer = new soundplayer({
  filename: 'start.wav',
  debug: true,
  player: 'aplay',
  device: 'plughw:0,0',
  gain: 50,
});

soundPlayer.on('error', function(err) {
  console.error('error playing sound: ', err);
});

const myCamera = new PiCamera({
  mode: 'photo',
  output: imagePath,
  width: 640,
  height: 480,
  nopreview: true,
});

async function takePhoto() {
  console.log('starting playing sound');
  soundPlayer.play();
  await sleep(0); // this is messy because 'soundPlayer' doesn't support await
  console.log('taking picture');
  await myCamera.snap();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  takePhoto,
};
