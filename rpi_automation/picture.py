import os
import time
import picamera

celebration_images_base_path=os.environ.get('CELEBRATION_IMAGES_BASE_PATH')

camera=picamera.PiCamera()

def take_picture():
  millis=str(round(time.time() * 1000))
  celebration_image_path=celebration_images_base_path + millis + '.jpg'
  print("taking picture: " + celebration_image_path)
  camera.capture(celebration_image_path, use_video_port=True)
  print("picture successfully taken")
  return celebration_image_path
