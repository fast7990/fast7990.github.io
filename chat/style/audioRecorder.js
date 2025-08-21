class AudioRecorder {
  constructor() {
    // 初始化配置参数
    this.config = {
      sampleBits: 16,
      sampleRate: 16000,
      numChannels: 1,
      compiling: true, // 是否编译
    };
    // 初始化实例属性
    this.recorder = null;
    this.recordingStatus = "stop";
    this.audioDuration = 0;
    this.enableRealtimeTranslator = false;
    this.useTransfer = true;
    this.maxSendTime = 0;
    this.maxSendTimer = null;
    this.ws = null;
    this.recognitionResultRealTime = "";
    this.recognitionResultList = [];
    this.recognitionResult = "";
    this.realTimeResult = [];
    this.sendInterval = null;
    this.drawRecordId = null;
    this.stream = null;

    // 初始化 recorder
    this.initRecorder();
    // 绑定事件监听
    this.bindEvents();
  }

  // 初始化录音器
  initRecorder() {
    this.recorder = new Recorder(this.config);
  }

  // 绑定事件
  bindEvents() {
    window.addEventListener("beforeunload", () => this.endAudioRecorder());
  }

  // 绘制录音波形图
  drawRecord() {
    // 验证stream是否为有效的MediaStream
    if (!this.stream || !(this.stream instanceof MediaStream)) {
      console.error("无法获取有效的媒体流:", this.stream);
      return;
    }
    // 用requestAnimationFrame稳定60fps绘制
    this.drawRecordId = requestAnimationFrame(() => this.drawRecord());
    const canvas = document.getElementById("waveformCanvas");
    this.drawWave(canvas);
  }

  // 绘制波形图
  drawWave(canvas) {
    const ctx = canvas.getContext("2d");
    const dataArray = this.recorder.getRecordAnalyseData();
    const bufferLength = dataArray.length;
    // 填充背景色
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 设定波形绘制颜色
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0d9efd";
    ctx.beginPath();
    const sliceWidth = (canvas.width * 1.0) / bufferLength; // 一个点占多少位置
    let x = 0; // 绘制点的x轴位置
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) {
        // 第一个点
        ctx.moveTo(x, y);
      } else {
        // 剩余的点
        ctx.lineTo(x, y);
      }
      // 依次平移，绘制所有点
      x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }

  // 开始录音获取权限
  startAudioRecorderInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          // 用户授予权限后，会得到音频流MediaStream对象
          console.log("麦克风权限已被授予，音频流:", stream);
          this.stream = stream; // 保存流到实例变量
          return stream;
        })
        .catch((error) => {
          // 用户拒绝权限，或者浏览器不支持等情况会进入这里
          console.error("无法获取麦克风权限:", error);
          console.log(`${error.name}: ${error.message}`);
          showNotification(
            `需要麦克风权限才能进行录音，请在设置中允许应用访问麦克风 ${error.name}: ${error.message}`,
            "error"
          );
          throw error;
        });
    } else {
      const error = new Error("浏览器不支持媒体设备API");
      console.log(`${error.name}: ${error.message}`);
      showNotification(
        `需要麦克风权限才能进行录音，请在设置中允许应用访问麦克风 ${error.name}: ${error.message}`,
        "error"
      );
      return Promise.reject(error);
    }
  }

  // 开始录音
  startAudioRecorder() {
    this.recorder.start(); // 开始录音
    this.recordingStatus = "recording"; // 正在录音
    this.drawRecord(); // 录音波形图
    this.recorder.onprogress = (params) => {
      this.audioDuration = params.duration.toFixed(0);
      // console.log("当前获取到到音频数据", params); // 当前获取到到音频数据
    };
    if (this.enableRealtimeTranslator) {
      this.startTranslate();
    }
  }

  startTranslate() {
    if (this.useTransfer) {
      this.startRecognition();
      // 以下整个部分是限制一小时实时转写，暂时开放
      const oneHour = 60 * 60 * 1000; // 1小时
      const startTime = Date.now();
      this.maxSendTime = startTime + oneHour;
      this.maxSendTimer = setInterval(() => {}, 1000);
    }
  }

  async startRecognition() {
    // 如果已经有连接，先关闭
    if (this.ws) {
      this.stopRecognition();
    }
    // 创建WebSocket连接
    const baseToken = "xxx";
    const queryString = new URLSearchParams({
      reqId: getUrlParam("reqId"),
      src: getUrlParam("src"),
      userId: getUrlParam("userId"),
    }).toString();

    let wssUrl = "";
    const wsUrl = `${wssUrl}/v2/transcribe/realtime?${queryString}`;
    console.log(baseToken, wsUrl);
    this.ws = new WebSocket(wsUrl, ["chat", baseToken]);
    this.ws.binaryType = "arraybuffer";

    let reId = generateSecureRandomString();
    let reCid = generateSecureRandomString();
    const obj = {
      id: reId,
      cid: reCid,
      speaker: "1",
      name: "Speaker",
      avatar: "",
      content: ``,
      type: "text",
      status: 1,
      startTime: this.audioDuration * 1000,
      endTime: 0,
      createdBy: 0,
      updatedBy: 0,
      createdAt: "2025-04-29T02:23:26.514Z",
      updatedAt: "2025-04-29T02:23:26.514Z",
      productKey: "",
      userId: "",
      appkey: "",
    };

    this.ws.onmessage = (e) => {
      console.log("on message", e);
      const buffer = new Uint8Array(e.data);
      const header = buffer.slice(0, 4);
      const payloadLen = new DataView(buffer.slice(4, 8).buffer).getUint32(
        0,
        false
      );
      const payloadBytes = buffer.slice(8, 8 + payloadLen);

      const byte1 = header[1];
      const messageType = byte1 >> 4;

      const byte2 = header[2];
      const serializationMethod = byte2 >> 4;

      if (
        (messageType === 9 || messageType === 15) &&
        serializationMethod === 1
      ) {
        try {
          const jsonText = new TextDecoder().decode(payloadBytes);
          const data = JSON.parse(jsonText);
          console.log("data", data);
          if (data.status === "realtime") {
            this.recognitionResultRealTime += `📝 实时识别片段: ${data.text}\n`;

            const index = this.recognitionResultList.findIndex(
              (item) => item.id === obj.id
            );
            if (index !== -1) {
              // 找到了，更新内容
              this.recognitionResultList[index].content = `${data.text}`;
              console.log(
                "实时识别片段2:",
                this.recognitionResultList[index].content
              );
            } else {
              // 未找到，推入新项
              this.recognitionResultList.push(obj);
            }
          } else if (data.status === "completed") {
            this.recognitionResult += `✅ 最终识别结果: ${data.text}\n`;
            const index = this.recognitionResultList.findIndex(
              (item) => item.id === reId
            );
            // 准备一个新的识别项
            reId = generateSecureRandomString();
            reCid = generateSecureRandomString();
            if (index !== -1) {
              // 找到，更新该项的 content
              this.recognitionResultList[index].content = `${data.text}\n`;

              obj.id = reId;
              obj.cid = reCid;
            } else {
              console.log("recognitionResultListpush,最终识别结果");
              obj.id = reId;
              obj.cid = reCid;
              this.recognitionResultList.push(obj);
              this.realTimeResult = [];
            }

            if (data.segments) {
              data.segments.forEach((seg) => {
                const speaker = seg.speaker || "未知说话人";
                this.recognitionResult += `👤 ${speaker} [${seg.start.toFixed(
                  2
                )}s - ${seg.end.toFixed(2)}s]: ${seg.text}\n`;
              });
            }
          } else if (data.status === "success") {
            this.recognitionResult += `连接成功\n`;
          } else {
            this.recognitionResult += `📦 其他类型数据: ${jsonText}\n`;
          }
        } catch (err) {
          console.error("解析错误:", err);
        }
      } else {
        console.warn("收到非预期消息", { messageType, serializationMethod });
      }
    };

    this.ws.onopen = async () => {
      const config = {
        format: "pcm",
        audio_format: {
          codec: "PCM",
          samplerate: 16000,
          channel: 1,
          bitdepth: 16,
        },
      };
      const fullRequest = this.buildPacket(1, config, 0, true);
      console.log("fullRequest", fullRequest);
      this.ws.send(fullRequest);

      this.sendInterval = setInterval(() => {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && this.recorder) {
          const recentData = this.recorder.getNextData();
          let lastTwoSeconds = [];
          if (recentData && recentData.length > 0) {
            lastTwoSeconds = this.getLastTwoSecondsDataSimple(recentData);
            console.log("最后两秒的数据:", lastTwoSeconds);
          }
          const pcmDataViews = lastTwoSeconds || recentData;
          console.log("pcmData", pcmDataViews);
          if (pcmDataViews && pcmDataViews.length > 0) {
            try {
              let totalLength = 0;
              pcmDataViews.forEach((view) => {
                totalLength += view.byteLength;
              });

              const buffer = new ArrayBuffer(totalLength);
              const uint8Array = new Uint8Array(buffer);

              let offset = 0;
              pcmDataViews.forEach((view) => {
                const tempArray = new Uint8Array(view.buffer);
                uint8Array.set(tempArray, offset);
                offset += view.byteLength;
              });

              const audioData = new Int16Array(buffer);
              const rawPayload = new Uint8Array(audioData.buffer);
              const audioPacket = this.buildPacket(2, rawPayload);
              this.ws.send(audioPacket);
              console.log("已发送音频数据，长度:", rawPayload.length);
            } catch (err) {
              console.error("处理音频数据错误:", err);
            }
          }
        }
      }, 200);
    };
  }

  // 协议头构建函数
  buildHeader(messageType, flags = 0, serialization = 1, compression = 0) {
    const version = 1;
    const headerSize = 1;
    const byte0 = (version << 4) | headerSize;
    const byte1 = (messageType << 4) | flags;
    const byte2 = (serialization << 4) | compression;
    const byte3 = 0;
    return new Uint8Array([byte0, byte1, byte2, byte3]);
  }

  buildPacket(messageType, payload, flags = 0, isJson = false) {
    const header = this.buildHeader(messageType, flags, isJson ? 1 : 0);
    const payloadBytes = isJson
      ? new TextEncoder().encode(JSON.stringify(payload))
      : payload;
    const sizeBytes = new Uint8Array(4);
    new DataView(sizeBytes.buffer).setUint32(0, payloadBytes.length, false);
    return new Blob([header, sizeBytes, payloadBytes]);
  }

  // 停止识别
  async stopRecognition() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const config = {};
      const fullRequest = this.buildPacket(4, config, 0, true);
      this.ws.send(fullRequest);
      this.ws.close();
    }
    if (this.sendInterval) {
      clearInterval(this.sendInterval);
      this.sendInterval = null;
    }
    if (this.maxSendTimer) {
      clearInterval(this.maxSendTimer);
      this.maxSendTimer = null;
    }
  }

  // 停止录音
  async stopAudioRecorder() {
    await this.recorder.stop();
    if (this.drawRecordId) {
      cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
    }
    return true;
  }

  // 结束录音
  endAudioRecorder() {
    this.stopAudioRecorder();
    this.stopRecognition();
  }

  // 获取实时结果
  getRealTimeResult() {
    return Array.isArray(this.recognitionResultList)
      ? [...this.recognitionResultList]
      : [];
  }

  // 工具方法：获取最后两秒数据
  getLastTwoSecondsDataSimple(data) {
    // 实现获取最后两秒数据的逻辑
    return data.slice(-2 * 16000 * 2); // 假设16000采样率，16位，单声道
  }
  wavToMp3(wavBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(wavBlob);
      reader.onload = () => {
        const arrayBuffer = reader.result;
        // arrayBuffer 转 blob
        const mp3Blob = new Blob([arrayBuffer], { type: "audio/mp3" });
        resolve(mp3Blob);
      };
      reader.onerror = reject;
    });
  }
}

// 导出实例以便外部使用
window.AudioRecorder = AudioRecorder;
