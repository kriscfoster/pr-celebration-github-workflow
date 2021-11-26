module.exports = {
  port: process.env.PORT || 5000,
  driveFolderId: process.env.DRIVE_FOLDER_ID,
  pathToCredentials: `${__dirname}/client_secrets.json`,
  imagePath: `${ __dirname }/image.jpg`,
  authorizationToken: process.env.AUTHORIZATION_TOKEN,
}
