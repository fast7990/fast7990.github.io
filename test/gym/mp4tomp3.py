import subprocess

def mp4_to_mp3(mp4_path, mp3_path):
    """
    使用ffmpeg将mp4文件转换为mp3文件
    
    :param mp4_path: 输入的mp4文件路径
    :param mp3_path: 输出的mp3文件路径
    """
    try:
        # 构建ffmpeg命令
        command = ['ffmpeg', '-i', mp4_path, '-vn', '-acodec', 'libmp3lame', '-q:a', '2', mp3_path]
        # 执行命令
        subprocess.run(command, check=True)
        print(f"转换成功，文件已保存至 {mp3_path}")
    except subprocess.CalledProcessError as e:
        print(f"转换失败: {e}")
    except Exception as e:
        print(f"发生错误: {e}")

if __name__ == "__main__":
    # 示例用法
    input_mp4 = "input.mp4"
    output_mp3 = "output.mp3"
    mp4_to_mp3(input_mp4, output_mp3)
