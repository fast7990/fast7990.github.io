import cv2
import numpy as np
import time
from io import BytesIO

class VideoCapture:
    """视频流捕获器，用于从视频元素中捕获视频帧"""
    
    def __init__(self, browser_controller, config):
        """
        初始化视频流捕获器
        
        Args:
            browser_controller: 浏览器控制器实例
            config: 视频捕获配置
        """
        self.browser_controller = browser_controller
        self.config = config
        self.frame_count = 0
    
    def capture_frames(self, video_element, callback=None):
        """
        开始捕获视频帧
        
        Args:
            video_element: 视频元素对象
            callback: 回调函数，每捕获一帧调用一次，传入帧数据和检测结果
        
        Returns:
            list: 捕获的帧列表
        """
        captured_frames = []
        frame_interval = 1.0 / self.config['frame_rate']
        
        print(f"开始捕获视频帧，帧率: {self.config['frame_rate']} fps")

        # 在开始捕获前，尝试确保视频处于播放状态
        try:
            ensure_fn = getattr(self.browser_controller, "ensure_video_playing", None)
            if callable(ensure_fn):
                ok = ensure_fn(video_element, self.config.get("play_delay", 2))
                if not ok:
                    print("警告: 无法确认视频处于播放状态，将尝试继续截帧")
        except Exception as e:
            print(f"尝试启动视频播放时出错: {e}")
        
        for i in range(self.config['max_frames']):
            start_time = time.time()
            
            # 捕获一帧
            frame = self._capture_single_frame(video_element)
            
            if frame is None:
                print("无法捕获视频帧，停止捕获")
                break
            
            # 处理帧
            processed_frame = self._process_frame(frame)
            
            # 保存帧
            captured_frames.append(processed_frame)
            self.frame_count += 1
            
            # 调用回调函数
            if callback:
                callback(processed_frame, i)
            
            # 控制帧率
            elapsed_time = time.time() - start_time
            sleep_time = max(0, frame_interval - elapsed_time)
            time.sleep(sleep_time)
            
            print(f"已捕获 {self.frame_count}/{self.config['max_frames']} 帧", end="\r")
        
        print(f"\n视频帧捕获完成，共捕获 {self.frame_count} 帧")
        return captured_frames
    
    def _capture_single_frame(self, video_element):
        """
        捕获单帧图像
        
        Args:
            video_element: 视频元素对象
        
        Returns:
            numpy.ndarray: 捕获的图像帧
        """
        try:
            # 根据配置选择捕获方法
            if self.config['capture_method'] == 'screenshot':
                # 使用截图方法捕获帧
                screenshot_bytes = self.browser_controller.screenshot_element(video_element)
                
                if screenshot_bytes:
                    # 将截图数据转换为numpy数组
                    np_arr = np.frombuffer(screenshot_bytes, np.uint8)
                    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
                    return frame
            elif self.config['capture_method'] == 'stream_url':
                # TODO: 实现直接获取视频流URL的方法
                print("stream_url捕获方法尚未实现")
                return None
            
            return None
        except Exception as e:
            print(f"捕获单帧失败: {e}")
            return None
    
    def _process_frame(self, frame):
        """
        处理视频帧
        
        Args:
            frame: 原始图像帧
        
        Returns:
            numpy.ndarray: 处理后的图像帧
        """
        if frame is None:
            return None
        
        # 调整帧大小
        resized_frame = cv2.resize(
            frame, 
            (self.config['resize_width'], self.config['resize_height']),
            interpolation=cv2.INTER_AREA
        )
        
        return resized_frame
    
    def save_frames(self, frames, output_path):
        """
        保存捕获的帧为视频文件
        
        Args:
            frames: 帧列表
            output_path: 输出视频路径
        """
        if not frames:
            print("没有帧可保存")
            return
        
        # 获取帧的尺寸
        height, width, _ = frames[0].shape
        
        # 创建视频写入器
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, self.config['frame_rate'], (width, height))
        
        # 写入帧
        for frame in frames:
            out.write(frame)
        
        # 释放资源
        out.release()
        
        print(f"视频已保存到: {output_path}")
    
    def get_capture_stats(self):
        """
        获取捕获统计信息
        
        Returns:
            dict: 统计信息
        """
        return {
            "frame_count": self.frame_count,
            "frame_rate": self.config['frame_rate'],
            "max_frames": self.config['max_frames'],
            "resize_width": self.config['resize_width'],
            "resize_height": self.config['resize_height'],
            "capture_method": self.config['capture_method']
        }
