# actions-experiments

Experimenting with GitHub actions to do fun things..

## rpi_automation

This python application is designed to run on a Raspberry PI with a camera module.
It won't run successfully on other operating systems due to the dependency on [picamera](https://picamera.readthedocs.io/).

### Developer Setup

#### setting up virtual environment
`python3 -m venv env`

#### activating virtual environment
`source env/bin/activate`

#### leaving virtual environment
`deactivate`

#### installing dependencies from requirements file
`pip install -r requirements.txt`

#### required environment variables
- `CELEBRATION_IMAGES_BASE_PATH`
