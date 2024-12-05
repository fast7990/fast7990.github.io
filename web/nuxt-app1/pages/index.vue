<!--
 * @Date: 2024-12-05 15:22:11
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-05 16:51:58
 * @FilePath: \nuxt-app\pages\index.vue
-->
<template>
  <div>
    <h3>index</h3>
    <div class="flex flex-col">
      <p><nuxt-link to="/about">About</nuxt-link></p>
      <p><nuxt-link to="/home">home</nuxt-link></p>
    </div>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
  </div>
</template>
