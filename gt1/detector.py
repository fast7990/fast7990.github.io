from ultralytics import YOLO
import numpy as np
import cv2

class Detector:
    """目标检测器，使用YOLO模型检测视频中的人物和车辆"""
    
    def __init__(self, config):
        """
        初始化目标检测器
        
        Args:
            config: 检测配置
        """
        self.config = config
        self.model = None
        self.class_names = None
        self._load_model()
    
    def _load_model(self):
        """加载YOLO模型"""
        print(f"正在加载YOLO模型: {self.config['model_name']}")
        
        # 加载预训练模型
        self.model = YOLO(f"{self.config['model_name']}.pt")
        
        # 获取类别名称
        self.class_names = self.model.names
        
        print(f"模型加载完成，可检测类别数: {len(self.class_names)}")
    
    def detect(self, frame):
        """
        对单帧图像进行目标检测
        
        Args:
            frame: 输入图像帧 (numpy.ndarray)
        
        Returns:
            list: 检测结果列表，每个元素包含：[object_type, confidence, bbox]
        """
        if self.model is None:
            raise ValueError("模型未加载")
        
        # 执行检测
        results = self.model.predict(
            source=frame,
            conf=self.config['confidence_threshold'],
            iou=self.config['iou_threshold'],
            device=self.config['device'],
            classes=self.config['classes'],
            verbose=False
        )
        
        # 处理检测结果
        detections = []
        for result in results:
            boxes = result.boxes.cpu().numpy()
            
            for box in boxes:
                # 提取边界框
                bbox = box.xyxy[0]  # [x1, y1, x2, y2]
                
                # 提取类别和置信度
                class_idx = int(box.cls[0])
                confidence = float(box.conf[0])
                
                # 获取类别名称
                object_type = self.class_names[class_idx]
                
                # 添加到检测结果列表
                detections.append([object_type, confidence, bbox])
        
        return detections
    
    def draw_detections(self, frame, detections, config):
        """
        在图像上绘制检测结果
        
        Args:
            frame: 输入图像帧
            detections: 检测结果列表
            config: 可视化配置
        
        Returns:
            numpy.ndarray: 绘制了检测结果的图像
        """
        if not config['draw_bboxes']:
            return frame
        
        # 复制图像，避免修改原图像
        result_frame = frame.copy()
        
        # 定义颜色映射，不同类别使用不同颜色
        color_map = {
            'person': (0, 255, 0),      # 绿色
            'car': (255, 0, 0),         # 红色
            'motorcycle': (0, 0, 255),  # 蓝色
            'bus': (255, 255, 0),       # 黄色
            'truck': (255, 0, 255)      # 紫色
        }
        
        # 绘制每个检测结果
        for detection in detections:
            object_type, confidence, bbox = detection
            
            # 获取颜色
            color = color_map.get(object_type, (255, 255, 255))  # 默认白色
            
            # 绘制边界框
            x1, y1, x2, y2 = map(int, bbox)
            cv2.rectangle(result_frame, (x1, y1), (x2, y2), color, 2)
            
            # 绘制标签和置信度
            if config['draw_labels']:
                label = f"{object_type}"
                if config['draw_confidence']:
                    label += f" {confidence:.2f}"
                
                # 计算标签位置
                label_size, base_line = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
                y1_label = max(y1, label_size[1] + 10)
                
                # 绘制标签背景
                cv2.rectangle(result_frame, (x1, y1_label - label_size[1] - 10), 
                            (x1 + label_size[0], y1_label + base_line - 5), color, -1)
                
                # 绘制标签文本
                cv2.putText(result_frame, label, (x1, y1_label - 5), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)
        
        return result_frame
    
    def get_detection_info(self):
        """
        获取检测信息
        
        Returns:
            dict: 检测信息
        """
        return {
            "model_name": self.config['model_name'],
            "confidence_threshold": self.config['confidence_threshold'],
            "iou_threshold": self.config['iou_threshold'],
            "device": self.config['device'],
            "classes": self.config['classes'],
            "class_names": {idx: self.class_names[idx] for idx in self.config['classes']}
        }
