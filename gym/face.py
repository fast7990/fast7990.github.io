import my_came
import cv2
import datetime


def initFace():
    my_came_obj = my_came.VideoCapture()
    cap = my_came_obj.cap
    # 循环读取摄像头的画面
    start_time = datetime.datetime.now()
    # 定义一个自增变量
    count = 0
    while True:
        # 读取画面
        ret, frame = cap.read()
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
            # 获取时间戳并取整
            time = round(datetime.datetime.now().timestamp())
            # 存储为不相同的图片
            cv2.imwrite('image/image{}.png'.format(time), frame)
            start_time = datetime.datetime.now()
        # count大于2时退出循环
        if count > 2:
            break
        # 按Esc键退出
        if cv2.waitKey(1) & 0xFF == 27:
            break
    del my_came_cap


initFace()
