import cv2
import datetime


def saveImg(frame, num):
    # 获取时间戳并取整
    time = round(datetime.datetime.now().timestamp())
    # 存储为不相同的图片
    cv2.imwrite('image/image{}.png'.format(num), frame)
