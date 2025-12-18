# 配置文件

# 目标网页配置
TARGET_CONFIG = {
    "url": "https://www.skylinewebcams.com/zh/webcam/italia/lazio/roma/piazza-di-spagna.html",  # 目标网页URL
    "container_id": "live",  # 包含video标签的div容器id
    "wait_time": 10,  # 等待页面加载的时间（秒）
    "play_delay": 2  # 等待视频开始播放的延迟（秒）
}

# 检测模型配置
DETECTION_CONFIG = {
    "model_name": "yolov8n",  # 模型名称（yolov8n/yolov8s/yolov8m/yolov8l/yolov8x）
    "confidence_threshold": 0.5,  # 检测置信度阈值
    "iou_threshold": 0.45,  # IOU阈值
    "device": "cpu",  # 设备（cpu/cuda）
    "classes": [0, 2, 3, 5, 7],  # 检测的类别索引：0=person, 2=car, 3=motorcycle, 5=bus, 7=truck
    "model_path": "models/"  # 模型保存路径
}

# 无头浏览器配置
BROWSER_CONFIG = {
    "headless": True,  # 是否使用无头模式
    "slow_mo": 0,  # 慢动作（毫秒）
    "args": [  # 浏览器启动参数
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920,1080"
    ]
}

# 视频流捕获配置
VIDEO_CONFIG = {
    "frame_rate": 30,  # 捕获帧率
    "max_frames": 1000,  # 最大捕获帧数
    "resize_width": 640,  # 调整帧宽度
    "resize_height": 360,  # 调整帧高度
    "capture_method": "screenshot"  # 捕获方法：screenshot/stream_url
}

# 事件记录配置
EVENT_CONFIG = {
    "buffer_size": 200,  # 事件缓冲区大小
    "output_formats": ["json", "csv"],  # 输出格式
    "output_dir": "results/events/"  # 事件输出目录
}

# 结果报告配置
REPORT_CONFIG = {
    "generate_report": True,  # 是否生成报告
    "output_dir": "results/reports/"  # 报告输出目录
}

# 可视化配置
VISUALIZATION_CONFIG = {
    "draw_bboxes": True,  # 是否绘制边界框
    "draw_labels": True,  # 是否绘制标签
    "draw_confidence": True,  # 是否绘制置信度
    "save_video": False,  # 是否保存带检测框的视频
    "video_output_dir": "results/videos/"  # 视频输出目录
}

# 快照配置（保存带检测框的事件截图）
SNAPSHOT_CONFIG = {
    "enabled": True,               # 是否启用快照保存
    "output_dir": "results/snaps", # 快照保存目录
    "image_format": "jpg"          # 快照图片格式：jpg/png 等
}
