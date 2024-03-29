'''
Date: 2024-03-28 17:58:32
LastEditors: v-huangshaopeng
LastEditTime: 2024-03-29 10:32:07
FilePath: \fast7990.github.io\gym\face.py
'''
import myCame
import cv2
import datetime
import localImg
# 加载预训练的人脸检测模型
face_cascade = cv2.CascadeClassifier('haar/haarcascade_frontalface_alt.xml')


def initFace(video_src):
    my_came_obj = myCame.VideoCapture(video_src)
    cap = my_came_obj.cap
    # 循环读取摄像头的画面
    start_time = datetime.datetime.now()
    # 定义一个自增变量
    count = 0
    while True:
        # 读取画面
        ret, frame = cap.read()

        # 将画面转换为灰度图像
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # 对画面进行人脸检测
        faces = face_cascade.detectMultiScale(
            gray, scaleFactor=1.1, minNeighbors=5)

        # 如果检测到有人脸，就进行报警
        if len(faces) > 0:
            # 对检测到的人脸进行画框标记
            for (x, y, w, h) in faces:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            print("{} + {}".format("persion！时间:", datetime.datetime.now()))

        # 判断画面是否正确读取
        if not ret:
            print("无法读取画面")
            break
        # 摄像头是和人对立的，将图像左右调换回来正常显示
        frame = cv2.flip(frame, 1)
        # 显示画面
        cv2.imshow('frame', frame)
        # 截取图片并保存每5秒一张
        if (datetime.datetime.now() - start_time).seconds >= 5:
            count += 1
            localImg.saveImg(frame, count)
            start_time = datetime.datetime.now()
        # count大于2时退出循环
        if count > 2:
            break
        # 按Esc键退出
        if cv2.waitKey(1) & 0xFF == 27:
            break
