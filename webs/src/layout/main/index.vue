<template>
  <div class="main bag-scroll">
    <router-view v-slot="{ Component }" v-if="isRoad">
      <transition
        mode="out-in"
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
      >
        <keep-alive v-if="app.userSetting.keepAlive" :max="30" :include="caches">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineComponent, inject, nextTick, ref } from "vue";
import appStore from "@/pinia/app.ts";
import { animations } from "@/config/map.ts";
import NProgress from "nprogress";

const app = appStore();
const $mitt: any = inject("$mitt");
const isRoad = ref(true);
const caches = computed(() => {
  // 缓存生效需要再页面中定义组件的name
  return app.allMenus.filter((item) => item.keepAlive).map((item) => item.name);
});
$mitt.on("onReload", () => {
  if (!NProgress.status) {
    NProgress.start();
    isRoad.value = false;
    nextTick(() => {
      isRoad.value = true;
      NProgress.done();
    });
  }
});
const enterActiveClass = computed(() => {
  let item = animations.find((item) => app.userSetting.animation === item.value);
  return [item.prefix, item.value].join(" ");
});
const leaveActiveClass = computed(() => {
  let item = animations.find((item) => app.userSetting.animation === item.value);
  return [item.prefix, item.out].join(" ");
});
</script>
<style lang="scss" scoped>
.main {
  padding: 3.11vh 38.4px 0 28.8px;
  overflow: scroll;
  height: 100%;
}
</style>
