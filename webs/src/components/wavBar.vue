<!--
 * @Date: 2024-04-03 10:47:27
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-04-03 17:13:08
 * @FilePath: \fast7990.github.io\webs\src\components\wavBar.vue
-->
<template>
  <div id="waveform">
    <!-- the waveform will be rendered here -->
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from "wavesurfer.js";
import { reactive, onMounted } from "vue";
let emit = defineEmits(["load"]);
const handlerData = reactive({
  height: 128,
  width: "100%",
});

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "#4F4A85",
    height: handlerData.height,
    /** The width of the waveform in pixels or any CSS value; defaults to 100% */
    width: handlerData.width,
    progressColor: "#383351",
    cursorWidth: 0,
    dragToSeek: false,
    url: "https://fast7990.github.io/webs/src/assets/mp3/123.mp3",
  });
  wavesurfer.on("interaction", () => {
    console.log("interaction===");
    // wavesurfer.pause()
  });
  wavesurfer.on("ready", () => {
    wavesurfer.play();
  });
  emit("load", wavesurfer);
});
</script>
