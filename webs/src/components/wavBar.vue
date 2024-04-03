<!--
 * @Date: 2024-04-03 10:47:27
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-03 16:12:26
 * @FilePath: \fast7990.github.io\webs\src\components\wavBar.vue
-->
<template>
  <div class="wav-suerfer w-[50%] h-10" id="wavsuerfer" @click="change">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import wavSuerfer from "@/common/js/wavsurfer";
export default {
  data() {
    return {
      dom: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.dom = new wavSuerfer("canvas", {
        height: document.getElementById("wavsuerfer").offsetHeight,
        width: document.getElementById("wavsuerfer").offsetWidth,
      });
      let that = this;
      function loadAudioFile(url) {
        var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
        xhr.open("GET", url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function (e) {
          //下载完成
          that.dom.change(this.response);
          that.$emit("load", true);
        };
        xhr.send();
      }
      loadAudioFile("./mp3/123.mp3");
    });
  },
  methods: {
    change(e) {
      this.dom.startStop();
    },
  },
};
</script>
