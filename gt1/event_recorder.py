import json
import csv
import uuid
from datetime import datetime
from pathlib import Path

class EventRecorder:
    """事件记录器，用于记录检测到的人物和车辆事件"""
    
    def __init__(self, video_info, detection_info, config):
        """
        初始化事件记录器
        
        Args:
            video_info: 视频信息
            detection_info: 检测信息
            config: 配置参数
        """
        self.video_info = video_info
        self.detection_info = detection_info
        self.config = config
        self.event_buffer = []
        self.output_dir = Path(config['output_dir'])
        self.output_dir.mkdir(exist_ok=True)
        
        # 生成唯一的运行ID，用于文件名
        self.run_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.video_id = video_info.get('video_id', 'unknown')
        
        # 初始化文件
        self._init_files()
    
    def _init_files(self):
        """初始化事件文件"""
        # 生成文件名
        base_filename = f"{self.run_id}_{self.video_id}_events"
        
        # 初始化JSON文件
        if 'json' in self.config['output_formats']:
            self.json_path = self.output_dir / f"{base_filename}.json"
            with open(self.json_path, 'w') as f:
                json.dump([], f)
        
        # 初始化CSV文件
        if 'csv' in self.config['output_formats']:
            self.csv_path = self.output_dir / f"{base_filename}.csv"
            with open(self.csv_path, 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow([
                    "event_id", "timestamp", "frame_number", "object_type",
                    "confidence", "bbox_x1", "bbox_y1", "bbox_x2", "bbox_y2",
                    "snapshot_path"
                ])
    
    def record_event(self, frame_number, object_type, confidence, bbox, snapshot_path=None):
        """
        记录检测事件
        
        Args:
            frame_number: 帧编号
            object_type: 目标类型
            confidence: 置信度
            bbox: 边界框坐标 (x1, y1, x2, y2)
            snapshot_path: 本次事件对应的快照图片路径（可选）
        """
        # 创建事件数据
        event = {
            "event_id": str(uuid.uuid4()),
            "timestamp": datetime.now().isoformat() + "Z",
            "frame_number": frame_number,
            "object_type": object_type,
            "confidence": float(confidence),
            "bbox": {
                "x1": int(bbox[0]),
                "y1": int(bbox[1]),
                "x2": int(bbox[2]),
                "y2": int(bbox[3])
            },
            "center": {
                "x": float((bbox[0] + bbox[2]) / 2),
                "y": float((bbox[1] + bbox[3]) / 2)
            },
            "snapshot_path": snapshot_path,
            "video_info": self.video_info,
            "detection_info": self.detection_info
        }
        
        # 添加到缓冲区
        self.event_buffer.append(event)
        
        # 检查是否需要写入文件
        if len(self.event_buffer) >= self.config['buffer_size']:
            self._write_events()
    
    def _write_events(self):
        """将缓冲区中的事件写入文件"""
        if not self.event_buffer:
            return
        
        # 写入JSON文件
        if 'json' in self.config['output_formats']:
            with open(self.json_path, 'r+') as f:
                existing_events = json.load(f)
                existing_events.extend(self.event_buffer)
                f.seek(0)
                json.dump(existing_events, f, indent=2)
                f.truncate()
        
        # 写入CSV文件
        if 'csv' in self.config['output_formats']:
            with open(self.csv_path, 'a', newline='') as f:
                writer = csv.writer(f)
                for event in self.event_buffer:
                    writer.writerow([
                        event["event_id"],
                        event["timestamp"],
                        event["frame_number"],
                        event["object_type"],
                        event["confidence"],
                        event["bbox"]["x1"],
                        event["bbox"]["y1"],
                        event["bbox"]["x2"],
                        event["bbox"]["y2"],
                        event.get("snapshot_path", "") or ""
                    ])
        
        # 清空缓冲区
        self.event_buffer.clear()
    
    def flush(self):
        """强制写入所有事件到文件"""
        self._write_events()
    
    def get_statistics(self):
        """
        获取事件统计信息
        
        Returns:
            dict: 统计信息
        """
        # 读取所有事件
        if 'json' in self.config['output_formats']:
            with open(self.json_path, 'r') as f:
                events = json.load(f)
        else:
            events = []
        
        # 合并缓冲区中的事件
        all_events = events + self.event_buffer
        
        # 统计
        stats = {
            "total_events": len(all_events),
            "object_counts": {},
            "frame_with_events": len(set(event['frame_number'] for event in all_events)),
            "start_time": all_events[0]['timestamp'] if all_events else None,
            "end_time": all_events[-1]['timestamp'] if all_events else None
        }
        
        # 按对象类型统计
        for event in all_events:
            obj_type = event['object_type']
            stats['object_counts'][obj_type] = stats['object_counts'].get(obj_type, 0) + 1
        
        return stats
    
    def generate_report(self, report_config):
        """
        生成检测报告
        
        Args:
            report_config: 报告配置
        """
        if not report_config['generate_report']:
            return
        
        # 获取统计信息
        stats = self.get_statistics()
        
        # 生成报告
        report_dir = Path(report_config['output_dir'])
        report_dir.mkdir(exist_ok=True)
        
        report_path = report_dir / f"{self.run_id}_{self.video_id}_report.txt"
        
        with open(report_path, 'w') as f:
            f.write("===== 视频检测报告 =====\n\n")
            f.write(f"运行ID: {self.run_id}\n")
            f.write(f"视频ID: {self.video_id}\n")
            f.write(f"开始时间: {stats['start_time']}\n")
            f.write(f"结束时间: {stats['end_time']}\n\n")
            
            f.write("===== 检测统计 =====\n\n")
            f.write(f"总事件数: {stats['total_events']}\n")
            f.write(f"含事件帧数: {stats['frame_with_events']}\n\n")
            
            f.write("===== 对象类型统计 =====\n\n")
            for obj_type, count in stats['object_counts'].items():
                f.write(f"{obj_type}: {count} 次\n")
            
            f.write("\n===== 配置信息 =====\n\n")
            f.write(f"视频URL: {self.video_info.get('url', 'unknown')}\n")
            f.write(f"模型名称: {self.detection_info.get('model_name', 'unknown')}\n")
            f.write(f"置信度阈值: {self.detection_info.get('confidence_threshold', 'unknown')}\n")
            f.write(f"检测类别: {self.detection_info.get('classes', 'unknown')}\n")
        
        print(f"报告已生成: {report_path}")
