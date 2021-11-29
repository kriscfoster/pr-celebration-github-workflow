const PiCamera = require('pi-camera');
const soundplayer = require('sound-player');
const { imagePath } = require('./config');

const soundPlayer = new soundplayer({
  filename: 'start.wav',
  debug: true,
  player: 'aplay',
  device: 'plughw:0,0',
});

const myCamera = new PiCamera({
  mode: 'photo',
  output: imagePath,
  width: 640,
  height: 480,
  nopreview: true,
});

async function takePhoto() {
  soundPlayer.on('error', function(err) {
    console.error('error playing sound: ', err);
  });

  soundPlayer.on('complete', async () => {
    console.log('finished playing sound');
    await myCamera.snap();
  });

  soundPlayer.play();
}

module.exports = {
  takePhoto,
};
