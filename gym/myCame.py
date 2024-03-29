'''
Date: 2024-03-28 14:45:46
LastEditors: v-huangshaopeng
LastEditTime: 2024-03-29 10:15:36
FilePath: \fast7990.github.io\gym\myCame.py
'''
import cv2
# 定义相机函数


class VideoCapture:
    def __init__(self, video_src=0):
        # 开启ip摄像头video_src
        self.video_src = video_src
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
                    "Unable to read frame from video source", self.video_src)
        else:
            raise ValueError(
                "Unable to read frame from closed video source", self.video_src)

    def __del__(self):
        if self.cap.isOpened():
            self.cap.release()

    def destroyAllWindows(self):
        self.cap.release()
        cv2.destroyAllWindows()
