import cv2
import numpy as np
from pathlib import Path


class LocalVideoReader:
    """本地视频文件读取器，用于从本地视频文件中读取帧"""
    
    def __init__(self, video_path, config):
        """
        初始化本地视频读取器
        
        Args:
            video_path: 本地视频文件路径
            config: 视频处理配置
        """
        self.video_path = Path(video_path)
        if not self.video_path.exists():
            raise FileNotFoundError(f"视频文件不存在: {video_path}")
        
        self.config = config
        self.cap = None
        self.frame_count = 0
        self.total_frames = 0
        self.fps = 0
        self.width = 0
        self.height = 0
        
        # 打开视频文件
        self._open_video()
    
    def _open_video(self):
        """打开视频文件并获取基本信息"""
        self.cap = cv2.VideoCapture(str(self.video_path))
        
        if not self.cap.isOpened():
            raise ValueError(f"无法打开视频文件: {self.video_path}")
        
        # 获取视频属性
        self.fps = self.cap.get(cv2.CAP_PROP_FPS) or self.config.get('frame_rate', 30)
        self.width = int(self.cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        self.height = int(self.cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        self.total_frames = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        print(f"视频文件: {self.video_path.name}")
        print(f"分辨率: {self.width}x{self.height}")
        print(f"帧率: {self.fps:.2f} fps")
        print(f"总帧数: {self.total_frames}")
    
    def read_frames(self, callback=None):
        """
        读取视频帧并处理
        
        Args:
            callback: 回调函数，每读取一帧调用一次，传入帧数据和帧号
        
        Returns:
            list: 读取的帧列表
        """
        if self.cap is None:
            raise ValueError("视频文件未打开")
        
        # 重置到视频开头
        self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        self.frame_count = 0
        
        read_frames = []
        max_frames = self.config.get('max_frames', self.total_frames)
        frame_skip = max(1, int(self.fps / self.config.get('frame_rate', 30)))
        
        print(f"开始读取视频帧，目标帧率: {self.config.get('frame_rate', 30)} fps")
        print(f"将每 {frame_skip} 帧读取一帧")
        
        frame_number = 0
        
        while True:
            ret, frame = self.cap.read()
            
            if not ret:
                print("视频读取完毕或到达文件末尾")
                break
            
            # 根据配置决定是否跳过这一帧
            if frame_number % frame_skip != 0:
                frame_number += 1
                continue
            
            # 处理帧（调整大小）
            processed_frame = self._process_frame(frame)
            
            if processed_frame is None:
                continue
            
            read_frames.append(processed_frame)
            self.frame_count += 1
            
            # 调用回调函数
            if callback:
                callback(processed_frame, self.frame_count - 1)
            
            print(f"已读取 {self.frame_count}/{min(max_frames, self.total_frames)} 帧", end="\r")
            
            # 检查是否达到最大帧数
            if self.frame_count >= max_frames:
                break
            
            frame_number += 1
        
        print(f"\n视频帧读取完成，共读取 {self.frame_count} 帧")
        return read_frames
    
    def _process_frame(self, frame):
        """
        处理视频帧（调整大小）
        
        Args:
            frame: 原始图像帧
        
        Returns:
            numpy.ndarray: 处理后的图像帧
        """
        if frame is None:
            return None
        
        # 调整帧大小
        resize_width = self.config.get('resize_width', self.width)
        resize_height = self.config.get('resize_height', self.height)
        
        if resize_width != self.width or resize_height != self.height:
            resized_frame = cv2.resize(
                frame,
                (resize_width, resize_height),
                interpolation=cv2.INTER_AREA
            )
            return resized_frame
        
        return frame
    
    def get_video_info(self):
        """
        获取视频信息
        
        Returns:
            dict: 视频信息
        """
        return {
            "video_path": str(self.video_path),
            "video_name": self.video_path.name,
            "fps": self.fps,
            "width": self.width,
            "height": self.height,
            "total_frames": self.total_frames,
            "duration": self.total_frames / self.fps if self.fps > 0 else 0
        }
    
    def close(self):
        """关闭视频文件"""
        if self.cap:
            self.cap.release()
            self.cap = None
            print("视频文件已关闭")
    
    def __enter__(self):
        """进入上下文管理器"""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """退出上下文管理器"""
        self.close()
