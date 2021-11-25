import os
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()           
drive = GoogleDrive(gauth) 

drive_folder_id=os.environ.get('DRIVE_FOLDER_ID')

def upload_file(file_path):
  print("uploading file")
  gfile = drive.CreateFile({"parents": [{"id": "1nAWw_U6hb76YQWQJ8rQgopvjUUuvIU0X"}]})
  print(gfile)
  # print(file_path)
  # gfile.SetContentFile("/home/pi/celebration_images/1637827012932.jpg")
  gfile.Upload()
  print("file successfully uploaded")
  return gfile['id']
