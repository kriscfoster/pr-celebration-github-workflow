from flask import Flask

from drive import upload_file

app = Flask(__name__)

upload_file("/Users/kfoster/Developer/projects/github-actions/requirements.txt")

@app.route('/celebrate')
def index():
  # TODO: Take celebration picture
  # TODO: Upload picture to google drive
  # TODO: Return id google drive image
  return {
    'id': '1QrUMKp0VjbRRQLG-rrN7iynADMvFIJJD'
  }

if __name__ == '__main__':
  app.run()
