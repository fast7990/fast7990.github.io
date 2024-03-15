<template>
  <div class="main-page">
    <router-view v-slot="{ Component }" v-if="isRoad">
      <transition mode="out-in">
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
import appStore from "@/pinia/app";

const app = appStore();
const isRoad = ref(true);
const caches = computed(() => {
  // 缓存生效需要再页面中定义组件的name
  return app.allMenus
    .filter((item: { keepAlive: any }) => item.keepAlive)
    .map((item: { name: any }) => item.name);
});
</script>
<style lang="scss" scoped></style>
