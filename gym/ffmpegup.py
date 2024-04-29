'''
Date: 2024-04-28 16:50:45
LastEditors: v-huangshaopeng
LastEditTime: 2024-04-29 17:38:49
FilePath: \fast7990.github.io\gym\ffmpegup.py
'''
# from ffmpy3 import FFmpeg
import ffmpeg
# 输入和输出流的参数
input_url = "rtsp://localhost:8554/stream"
output_url = "rtmp://server-69120-4-1320566112.sh.run.tcloudbase.com/live/livestream"

# 初始化FFmpeg对象
# ffmpeg = FFmpeg()

# 设置输入和输出选项
inputs = {
    input_url: None
}
outputs = {
    output_url: ['-vcodec', 'libx264', '-acodec', 'aac']
}

# 执行推流
stream = ffmpeg.input(input_url)
stream = ffmpeg.output(stream, output_url)
ffmpeg.run(stream)
# 检查推流结果
if stream['success']:
    print("Stream pushed successfully.")
else:
    print("Error pushing stream:", stream['stderr'])


#  ffmpeg -f dshow -i video="HP TrueVision HD Camera" -c:v h264 -c:a aac -f rtsp rtsp://localhost:8554/stream
#  ffmpeg -f dshow -i video="HP TrueVision HD Camera" -c:v h264 -c:a aac -f hls -hls_time 10 -hls_list_size 0 ./video/output.m3u8
