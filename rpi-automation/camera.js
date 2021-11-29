const PiCamera = require('pi-camera');
const soundplayer = require('sound-player');
const { imagePath } = require('./config');

const soundPlayer = new soundplayer({
  filename: 'start.wav',
  debug: true,
  player: 'aplay',
  device: 'plughw:0,0',
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
  setTimeout(async () => {
    console.log('taking picture');
    await myCamera.snap();
  }, 3000);
}

module.exports = {
  takePhoto,
};
