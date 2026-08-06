#!/usr/bin/env python3
"""
测试脚本，用于验证所有模块能否成功导入
"""

print("===== 开始测试模块导入 =====")

try:
    print("1. 导入配置模块...")
    from config import (
        TARGET_CONFIG,
        DETECTION_CONFIG,
        BROWSER_CONFIG,
        VIDEO_CONFIG,
        EVENT_CONFIG,
        REPORT_CONFIG,
        VISUALIZATION_CONFIG
    )
    print("✓ 配置模块导入成功")
except Exception as e:
    print(f"✗ 配置模块导入失败: {e}")

try:
    print("\n2. 导入浏览器控制模块...")
    from browser_controller import BrowserController
    print("✓ 浏览器控制模块导入成功")
except Exception as e:
    print(f"✗ 浏览器控制模块导入失败: {e}")

try:
    print("\n3. 导入视频捕获模块...")
    from video_capture import VideoCapture
    print("✓ 视频捕获模块导入成功")
except Exception as e:
    print(f"✗ 视频捕获模块导入失败: {e}")

try:
    print("\n4. 导入目标检测模块...")
    from detector import Detector
    print("✓ 目标检测模块导入成功")
except Exception as e:
    print(f"✗ 目标检测模块导入失败: {e}")

try:
    print("\n5. 导入事件记录器模块...")
    from event_recorder import EventRecorder
    print("✓ 事件记录器模块导入成功")
except Exception as e:
    print(f"✗ 事件记录器模块导入失败: {e}")

try:
    print("\n6. 导入工具函数模块...")
    from utils import setup_logger, ensure_directory, get_current_timestamp
    print("✓ 工具函数模块导入成功")
except Exception as e:
    print(f"✗ 工具函数模块导入失败: {e}")

print("\n===== 模块导入测试完成 =====")
