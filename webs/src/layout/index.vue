<!--
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-15 17:42:13
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-15 19:10:29
 * @FilePath: \fast7990.github.io\webs\src\layout\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import appStore from "@/pinia/app.ts";

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
