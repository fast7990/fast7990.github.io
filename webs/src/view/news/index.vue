<template>
  <div class="h-6">
    <h1 class="text-[30px] font-bold underline">1212</h1>
    <p class="w-32 h-32 md:bg-blue-200 xl:bg-red-200 bg-green-200 menu">
      asds<span>sd</span>
    </p>
    <wavBar ref="wavBarRef" @load="data.load"></wavBar>
  </div>
</template>
<script lang="ts" setup>
import wavBar from "@/components/wavBar.vue";
import { reactive, ref, onMounted, watch } from "vue";
const wavBarRef = ref();
const data = reactive({
  load: () => {
    setTimeout(() => {
      wavBarRef.value.dom.startStop();
    }, 2000);
  },
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
