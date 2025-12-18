#!/usr/bin/env python3
"""
视频人物和车辆检测主程序
"""

import time
from datetime import datetime

import cv2

# 导入配置
from config import (
    TARGET_CONFIG,
    DETECTION_CONFIG,
    BROWSER_CONFIG,
    VIDEO_CONFIG,
    EVENT_CONFIG,
    REPORT_CONFIG,
    VISUALIZATION_CONFIG,
    SNAPSHOT_CONFIG,
)

# 导入模块
from browser_controller import BrowserController
from video_capture import VideoCapture
from detector import Detector
from event_recorder import EventRecorder
from utils import setup_logger, ensure_directory, get_current_timestamp

# 设置日志
logger = setup_logger('main')

def main():
    """主函数"""
    logger.info("===== 视频人物和车辆检测系统开始运行 =====")
    
    # 记录开始时间
    start_time = datetime.now()
    
    browser_controller = None
    detector = None
    event_recorder = None
    
    try:
        # 1. 初始化浏览器控制器
        browser_controller = BrowserController(BROWSER_CONFIG)
        browser_controller.launch_browser()
        
        # 2. 访问目标网页
        browser_controller.navigate_to_url(TARGET_CONFIG['url'], TARGET_CONFIG['wait_time'])
        
        # 3. 定位视频元素
        video_element = browser_controller.locate_video_element(TARGET_CONFIG['container_id'])
        if not video_element:
            logger.error("无法定位视频元素，程序退出")
            return
        
        # 4. 确保视频正在播放
        is_playing = browser_controller.ensure_video_playing(video_element, TARGET_CONFIG['play_delay'])
        if not is_playing:
            logger.warning("视频无法播放，将尝试继续捕获帧")
        
        # 5. 获取视频信息
        video_info = browser_controller.get_video_info(video_element)
        video_info['container_id'] = TARGET_CONFIG['container_id']
        video_info['url'] = TARGET_CONFIG['url']
        logger.info(f"视频信息: {video_info}")
        
        # 6. 初始化检测器
        detector = Detector(DETECTION_CONFIG)
        detection_info = detector.get_detection_info()
        
        # 7. 初始化事件记录器
        event_recorder = EventRecorder(video_info, detection_info, EVENT_CONFIG)
        
        # 8. 初始化视频捕获器
        video_capture = VideoCapture(browser_controller, VIDEO_CONFIG)

        # 8.1 确保快照输出目录存在
        if SNAPSHOT_CONFIG["enabled"]:
            ensure_directory(SNAPSHOT_CONFIG["output_dir"])
        
        # 9. 定义帧处理回调函数
        def process_frame(frame, frame_number):
            """处理单帧图像"""
            # 执行检测
            detections = detector.detect(frame)
            
            # 如果本帧存在检测结果，为本帧生成一张带框快照
            snapshot_path = None
            frame_with_bboxes = frame

            if detections and VISUALIZATION_CONFIG["draw_bboxes"]:
                frame_with_bboxes = detector.draw_detections(
                    frame, detections, VISUALIZATION_CONFIG
                )

                if SNAPSHOT_CONFIG["enabled"]:
                    timestamp = get_current_timestamp()
                    filename = f"{timestamp}_frame_{frame_number}.{SNAPSHOT_CONFIG['image_format']}"
                    snapshot_path = f"{SNAPSHOT_CONFIG['output_dir'].rstrip('/')}/{filename}"

                    # 保存带检测框的快照图片
                    try:
                        cv2.imwrite(snapshot_path, frame_with_bboxes)
                    except Exception as e:
                        logger.error(f"保存快照失败: {snapshot_path}, 错误: {e}")
                        snapshot_path = None

            # 记录事件（每个检测共享同一张快照路径）
            for detection in detections:
                object_type, confidence, bbox = detection
                event_recorder.record_event(
                    frame_number, object_type, confidence, bbox, snapshot_path
                )
        
        # 10. 开始捕获视频帧并处理
        video_capture.capture_frames(video_element, process_frame)
        
        # 11. 强制写入所有事件
        event_recorder.flush()
        
        # 12. 生成检测报告
        event_recorder.generate_report(REPORT_CONFIG)
        
        # 13. 获取统计信息
        stats = event_recorder.get_statistics()
        logger.info(f"检测统计: {stats}")
        
        # 14. 记录结束时间
        end_time = datetime.now()
        total_time = (end_time - start_time).total_seconds()
        logger.info(f"程序运行时间: {total_time:.2f} 秒")
        
        logger.info("===== 视频人物和车辆检测系统运行完成 =====")
        
    except Exception as e:
        logger.error(f"程序运行出错: {e}", exc_info=True)
    
    finally:
        # 关闭所有资源
        logger.info("正在关闭资源...")
        
        # 确保事件被写入
        if event_recorder:
            event_recorder.flush()
            event_recorder.generate_report(REPORT_CONFIG)
        
        # 关闭浏览器
        if browser_controller:
            browser_controller.close()
        
        logger.info("所有资源已关闭")

if __name__ == "__main__":
    main()
