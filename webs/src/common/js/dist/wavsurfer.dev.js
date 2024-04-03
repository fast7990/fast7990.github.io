"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Date: 2024-04-03 10:49:58
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-03 10:50:13
 * @FilePath: \fast7990.github.io\webs\src\common\js\wavsurfer.js
 */
var AudioContext = null;
var canvasCtx = null;

var wavSurfer =
/*#__PURE__*/
function () {
  function wavSurfer(id, options) {
    _classCallCheck(this, wavSurfer);

    var canvas = document.getElementById(id);
    canvas.width = options.width;
    canvas.height = options.height;
    AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
    canvasCtx = canvas.getContext("2d");
    this.audioContext = new AudioContext(); //实例化
  } //播放暂停音频


  _createClass(wavSurfer, [{
    key: "startStop",
    value: function startStop() {
      var that = this;

      if (that.audioContext.state === 'running') {
        that.audioContext.suspend().then(function () {
          console.log('播放');
        });
      } else if (that.audioContext.state === 'suspended') {
        that.audioContext.resume().then(function () {
          console.log('暂停');
        });
      }
    }
  }, {
    key: "change",
    value: function change(files) {
      //当选择歌曲时，判断当前audioContext的状态，如果在进行中则关闭音频环境，
      //释放audioContext的所有资源，并重新实例化audioContext
      if (this.audioContext.state == 'running') {
        this.audioContext.close();
        this.audioContext = new AudioContext();
      }

      if (files.length == 0) return;
      this.fileReaderd(files);
    }
  }, {
    key: "fileReaderd",
    value: function fileReaderd(files) {
      var that = this;
      var count = 0;
      console.log("开始解码");
      var timer = setInterval(function () {
        count++;
        console.log('解码中,已用时' + count + '秒');
      }, 1000);
      that.audioContext.decodeAudioData(files, function (buffer) {
        clearInterval(timer);
        console.log('解码成功，用时共计:' + count + '秒');
        var audioBufferSourceNode = that.audioContext.createBufferSource();
        var analyser = that.audioContext.createAnalyser();
        analyser.fftSize = 256;
        audioBufferSourceNode.connect(analyser);
        analyser.connect(that.audioContext.destination);
        audioBufferSourceNode.buffer = buffer;
        audioBufferSourceNode.start();
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        console.log(audioBufferSourceNode);
        var oW = canvas.width;
        var oH = canvas.height;
        var color1 = canvasCtx.createLinearGradient(oW / 2, oH / 2 - 10, oW / 2, oH / 2 - 2);
        var color2 = canvasCtx.createLinearGradient(oW / 2, oH / 2 + 10, oW / 2, oH / 2 + 2);
        color1.addColorStop(0, 'RGBA(48, 218, 213, 0.8)'); // color1.addColorStop(.25, '#FF7F50');
        // color1.addColorStop(.5, '#8A2BE2');
        // color1.addColorStop(.75, '#4169E1');
        // color1.addColorStop(1, '#00FFFF');
        // color2.addColorStop(0, '#1E90FF');
        // color2.addColorStop(.25, '#FFD700');
        // color2.addColorStop(.5, '#8A2BE2');
        // color2.addColorStop(.75, '#4169E1');
        // color2.addColorStop(1, '#FF0000');

        color2.addColorStop(1, 'RGBA(48, 218, 213, 0.8)');

        function draw() {
          var drawVisual = requestAnimationFrame(draw);
          var barHeight; // 自定义获取数组里边数据的频步

          canvasCtx.clearRect(0, 0, oW, oH);

          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 20;
            analyser.getByteFrequencyData(dataArray); // 绘制向上的线条

            canvasCtx.fillStyle = color1;
            /* context.fillRect(x,y,width,height)
             * x，y是坐标
             * width，height线条的宽高
             */

            canvasCtx.fillRect(oW / 2 + i * 8, oH / 2, 2, -barHeight);
            canvasCtx.fillRect(oW / 2 - i * 8, oH / 2, 2, -barHeight); // 绘制向下的线条

            canvasCtx.fillStyle = color2;
            canvasCtx.fillRect(oW / 2 + i * 8, oH / 2, 2, barHeight);
            canvasCtx.fillRect(oW / 2 - i * 8, oH / 2, 2, barHeight);
          }
        }

        ;
        draw();
      });
    }
  }]);

  return wavSurfer;
}();

var _default = wavSurfer;
exports["default"] = _default;