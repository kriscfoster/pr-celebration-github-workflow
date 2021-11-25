# rpi-automation

This NodeJS application is designed to run on a Raspberry PI with a camera module.
It won't run successfully on other operating systems due to the dependency on [pi-camera](https://www.npmjs.com/package/pi-camera).

### developer setup

#### configuration

This application integrates with the Google Drive API. You will need to obtain valid credentials & place them in `./credentials.json`.

##### environment variables

- `DRIVE_FOLDER_ID`
- `PORT`
