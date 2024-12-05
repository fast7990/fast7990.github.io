<!--
 * @Date: 2024-12-05 15:37:44
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-05 17:35:14
 * @FilePath: \nuxt-app\pages\user\[id].vue
-->
<template>
  <div>
    <h1>User Details</h1>
    <p>User ID: {{ $route.params.id }}</p>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
console.log(route);
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === "string" && /^\d+$/.test(route.params.id);
  },
});
</script>
