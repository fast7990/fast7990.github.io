from playwright.sync_api import sync_playwright
import time

class BrowserController:
    """无头浏览器控制器，用于访问目标网页并定位视频标签"""
    
    def __init__(self, config):
        """
        初始化浏览器控制器
        
        Args:
            config: 浏览器配置
        """
        self.config = config
        self.playwright = None
        self.browser = None
        self.page = None
    
    def launch_browser(self):
        """
        启动无头浏览器
        """
        print("正在启动无头浏览器...")
        
        self.playwright = sync_playwright().start()
        
        # 启动浏览器
        self.browser = self.playwright.chromium.launch(
            headless=self.config['headless'],
            slow_mo=self.config['slow_mo'],
            args=self.config['args']
        )
        
        # 创建新页面
        self.page = self.browser.new_page()
        
        print("无头浏览器启动成功")
    
    def navigate_to_url(self, url, wait_time=10):
        """
        导航到指定URL
        
        Args:
            url: 目标URL
            wait_time: 等待页面加载的时间（秒）
        """
        if not self.page:
            raise ValueError("浏览器未启动")
        
        print(f"正在访问URL: {url}")
        
        # 导航到URL
        self.page.goto(url, wait_until='networkidle')
        
        # 等待页面加载完成
        time.sleep(wait_time)
        
        print(f"成功访问URL: {url}")
    
    def locate_video_element(self, container_id):
        """
        定位视频元素，在指定id的div容器下查找video标签
        
        Args:
            container_id: 包含video标签的div容器id
        
        Returns:
            视频元素对象
        """
        if not self.page:
            raise ValueError("浏览器未启动")
        
        print(f"正在定位视频元素，容器id: {container_id}")

        # 优先在指定容器下查找 <video>，放宽为只需出现在 DOM 中（attached），
        # 避免因为 display:none / 尺寸为 0 等导致 visible 检测失败
        try:
            container_selector = f"#{container_id}"
            video_selector = f"{container_selector} video"

            video_locator = self.page.locator(video_selector)
            # 等待至少有一个 video 节点挂载到 DOM
            video_locator.first.wait_for(state="attached", timeout=10000)

            count = video_locator.count()
            print(f"在选择器 {video_selector} 下找到 {count} 个 <video> 元素")
            return video_locator.first
        except Exception as e:
            print(f"在容器 {container_id} 下查找 <video> 失败: {e}")

        # 兜底：在整个页面范围内查找任意 <video> 元素
        try:
            page_video = self.page.locator("video").first
            page_video.wait_for(state="attached", timeout=10000)
            print("在页面全局范围内找到 <video> 元素，作为兜底")
            return page_video
        except Exception as e:
            print(f"全局查找 <video> 失败: {e}")
            return None
    
    def ensure_video_playing(self, video_element, play_delay=2):
        """
        确保视频正在播放
        
        Args:
            video_element: 视频元素对象
            play_delay: 等待视频开始播放的延迟（秒）
        
        Returns:
            bool: 视频是否成功播放
        """
        if not video_element:
            return False
        
        try:
            # 尝试播放视频
            self.page.evaluate("(video) => video.play()", video_element)
            
            # 等待视频开始播放
            time.sleep(play_delay)
            
            # 检查视频是否正在播放
            is_playing = self.page.evaluate("(video) => !video.paused", video_element)
            
            if is_playing:
                print("视频正在播放")
                return True
            else:
                print("视频未能播放，可能是自动播放限制")
                
                # 尝试点击视频区域来播放
                video_element.click()
                time.sleep(play_delay)
                
                # 再次检查
                is_playing = self.page.evaluate("(video) => !video.paused", video_element)
                if is_playing:
                    print("通过点击成功播放视频")
                    return True
                else:
                    print("无法播放视频")
                    return False
        except Exception as e:
            print(f"播放视频失败: {e}")
            return False
    
    def get_video_info(self, video_element):
        """
        获取视频信息
        
        Args:
            video_element: 视频元素对象
        
        Returns:
            dict: 视频信息
        """
        if not video_element:
            return {}
        
        try:
            # 获取视频信息
            js_code = '''(video) => ({
                duration: video.duration,
                currentTime: video.currentTime,
                paused: video.paused,
                videoWidth: video.videoWidth,
                videoHeight: video.videoHeight,
                src: video.src,
                poster: video.poster
            })'''
            video_info = self.page.evaluate(js_code, video_element)
            
            return video_info
        except Exception as e:
            print(f"获取视频信息失败: {e}")
            return {}
    
    def screenshot_element(self, element, **kwargs):
        """
        对元素进行截图
        
        Args:
            element: 目标元素
            **kwargs: 截图参数
        
        Returns:
            bytes: 截图数据
        """
        if not self.page or not element:
            return None
        
        try:
            # 截取元素图像
            screenshot_bytes = element.screenshot(**kwargs)
            return screenshot_bytes
        except Exception as e:
            print(f"截图失败: {e}")
            return None
    
    def close(self):
        """
        关闭浏览器
        """
        print("正在关闭浏览器...")
        
        if self.page:
            self.page.close()
        
        if self.browser:
            self.browser.close()
        
        if self.playwright:
            self.playwright.stop()
        
        print("浏览器已关闭")
    
    def __enter__(self):
        """进入上下文管理器"""
        self.launch_browser()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """退出上下文管理器"""
        self.close()
