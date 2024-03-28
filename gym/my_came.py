'''
Date: 2024-03-28 14:45:46
LastEditors: v-huangshaopeng
LastEditTime: 2024-03-28 18:38:59
FilePath: \fast7990.github.io\gym\came.py
'''
import cv2
import datetime

# 开启ip摄像头
video_src = "http://admin:admin@192.168.2.149:8081/"

# 定义相机函数


class VideoCapture:
    def __init__(self, video_src=0):
        self.cap = cv2.VideoCapture(video_src)
        if not self.cap.isOpened():
            raise ValueError("Unable to open video source", video_src)

    def get_frame(self):
        if self.cap.isOpened():
            ret, frame = self.cap
            if ret:
                return frame
            else:
                raise ValueError(
                    "Unable to read frame from video source", video_src)
        else:
            raise ValueError(
                "Unable to read frame from closed video source", video_src)

    def __del__(self):
        if self.cap.isOpened():
            self.cap.release()
            self.destroyAllWindows()

    def destroyAllWindows():
        cv2.destroyAllWindows()


# def camera_capture(video_src=0):
#     # 调用摄像头 0为电脑内置摄像头
#     cap = cv2.VideoCapture(video_src)
#     # 检查摄像头是否成功打开
#     if not cap.isOpened():
#         print("无法打开摄像头")
#         exit()
#         return False
#     # 循环读取摄像头的画面
#     start_time = datetime.datetime.now()
#     # 定义一个自增变量
#     count = 0
#     while True:
#         # 读取画面
#         ret, frame = cap.read()
#         # 判断画面是否正确读取
#         if not ret:
#             print("无法读取画面")
#             break
#         # 摄像头是和人对立的，将图像左右调换回来正常显示
#         frame = cv2.flip(frame, 1)
#         # 显示画面
#         cv2.imshow('frame', frame)
#         # 截取图片并保存每5秒一张
#         if (datetime.datetime.now() - start_time).seconds >= 5:
#             count += 1
#             # 获取时间戳并取整
#             time = round(datetime.datetime.now().timestamp())
#             # 存储为不相同的图片
#             cv2.imwrite('image/image{}.png'.format(time), frame)
#             start_time = datetime.datetime.now()
#         # count大于2时退出循环
#         if count > 2:
#             break
#         # 按Esc键退出
#         if cv2.waitKey(1) & 0xFF == 27:
#             break

#         # 释放摄像头资源
#         cap.release()

#         # 关闭显示窗口所有
#         cv2.destroyAllWindows()
#     return cap
