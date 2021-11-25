import os
import time
import picamera

celebration_images_base_path=os.environ.get('CELEBRATION_IMAGES_BASE_PATH')

camera=picamera.PiCamera()

def take_picture():
  millis=str(round(time.time() * 1000))
  print(millis)
  print(celebration_images_base_path)
  celebtation_image_path=celebration_images_base_path + millis + '.jpg'
  camera.capture(celebration_image_path)
  return celebration_image_path
