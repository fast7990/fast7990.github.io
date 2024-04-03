<template>
  <div class="h-6">
    <h1 class="text-[30px] font-bold underline">1</h1>
    <button @click="handlerData.stopPlay">111</button>
    <wavBar class="w-auto h-10" ref="wavBarRef" @load="handlerData.load"></wavBar>
  </div>
</template>
<script lang="ts" setup>
import wavBar from "@/components/wavBar.vue";
import { reactive, ref, onMounted, watch } from "vue";
const wavBarRef = ref();
const handlerData = reactive({
  load: (wavesurfer) => {
    handlerData.wavesurfer = wavesurfer;
    console.log(wavesurfer, "===");
  },
  stopPlay: () => {
    handlerData.wavesurfer.stop();
  },
  wavesurfer: null,
});
</script>
<style lang="postcss">
.menu {
  /* @apply p-2 m-2 text-gray-900 font-semibold; */
  /* border: 1px solid theme('colors.primary'); */
  span {
    color: #613535;
  }
}
</style>
