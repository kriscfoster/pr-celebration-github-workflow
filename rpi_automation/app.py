from flask import Flask

from picture import take_picture
from drive import upload_file

app = Flask(__name__)

@app.route('/celebrate')
def index():
  # TODO: Authentication
  picture_path = take_picture()
  id = upload_file(picture_path)
  return {
    'id': id
  }

if __name__ == '__main__':
  app.run()
