import logging
import os
import sys
from datetime import datetime

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('video_detection.log'),
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger('video_detection')

def setup_logger(name, level=logging.INFO):
    """
    设置日志记录器
    
    Args:
        name: 日志名称
        level: 日志级别
    
    Returns:
        logging.Logger: 日志记录器实例
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    # 避免重复添加处理器
    if not logger.handlers:
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        
        # 文件处理器
        file_handler = logging.FileHandler('video_detection.log')
        file_handler.setFormatter(formatter)
        
        # 控制台处理器
        stream_handler = logging.StreamHandler(sys.stdout)
        stream_handler.setFormatter(formatter)
        
        # 添加处理器
        logger.addHandler(file_handler)
        logger.addHandler(stream_handler)
    
    return logger

def ensure_directory(directory):
    """
    确保目录存在，如果不存在则创建
    
    Args:
        directory: 目录路径
    """
    if not os.path.exists(directory):
        os.makedirs(directory)
        logger.info(f"创建目录: {directory}")
    else:
        logger.info(f"目录已存在: {directory}")

def get_current_timestamp():
    """
    获取当前时间戳
    
    Returns:
        str: 格式化的时间戳 (YYYYMMDD_HHMMSS)
    """
    return datetime.now().strftime("%Y%m%d_%H%M%S")

def format_time(seconds):
    """
    将秒数格式化为可读时间
    
    Args:
        seconds: 秒数
    
    Returns:
        str: 格式化的时间字符串
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    
    if hours > 0:
        return f"{hours}h {minutes}m {secs}s"
    elif minutes > 0:
        return f"{minutes}m {secs}s"
    else:
        return f"{secs}s"

def calculate_fps(start_time, frame_count):
    """
    计算实际帧率
    
    Args:
        start_time: 开始时间
        frame_count: 已处理的帧数
    
    Returns:
        float: 实际帧率
    """
    if frame_count == 0:
        return 0.0
    
    elapsed_time = datetime.now().timestamp() - start_time.timestamp()
    return frame_count / elapsed_time

def clamp(value, min_value, max_value):
    """
    将值限制在指定范围内
    
    Args:
        value: 输入值
        min_value: 最小值
        max_value: 最大值
    
    Returns:
        float: 限制后的值
    """
    return max(min_value, min(value, max_value))

def parse_bbox(bbox_str):
    """
    解析边界框字符串
    
    Args:
        bbox_str: 边界框字符串，格式如 "[x1, y1, x2, y2]"
    
    Returns:
        tuple: 边界框坐标 (x1, y1, x2, y2)
    """
    # 移除括号并分割
    coords = bbox_str.strip('[]').split(',')
    return tuple(float(coord.strip()) for coord in coords)

def bbox_area(bbox):
    """
    计算边界框面积
    
    Args:
        bbox: 边界框坐标 (x1, y1, x2, y2)
    
    Returns:
        float: 边界框面积
    """
    x1, y1, x2, y2 = bbox
    return (x2 - x1) * (y2 - y1)

def iou(bbox1, bbox2):
    """
    计算两个边界框的交并比 (IoU)
    
    Args:
        bbox1: 第一个边界框坐标 (x1, y1, x2, y2)
        bbox2: 第二个边界框坐标 (x1, y1, x2, y2)
    
    Returns:
        float: IoU值
    """
    # 计算交集区域
    x1 = max(bbox1[0], bbox2[0])
    y1 = max(bbox1[1], bbox2[1])
    x2 = min(bbox1[2], bbox2[2])
    y2 = min(bbox1[3], bbox2[3])
    
    # 计算交集面积
    inter_area = max(0, x2 - x1) * max(0, y2 - y1)
    
    # 计算两个边界框的面积
    area1 = bbox_area(bbox1)
    area2 = bbox_area(bbox2)
    
    # 计算并集面积
    union_area = area1 + area2 - inter_area
    
    # 计算IoU
    return inter_area / union_area if union_area > 0 else 0.0
