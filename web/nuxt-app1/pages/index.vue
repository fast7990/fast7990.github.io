<!--
 * @Date: 2024-12-05 15:22:11
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-17 16:46:12
 * @FilePath: \nuxt-app1\pages\index.vue
-->
<!--
 * @Date: 2024-12-05 15:22:11
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-17 16:35:46
 * @FilePath: \nuxt-app1\pages\index.vue
-->
<!--
 * @Date: 2024-12-05 15:22:11
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-17 15:41:57
 * @FilePath: \nuxt-app1\pages\index.vue
-->
<template>
  <div>
    <h3>index</h3>
    <div class="flex flex-col">
      <p><nuxt-link to="/about">About</nuxt-link></p>
      <p><nuxt-link to="/home">home</nuxt-link></p>
      <p>{{ id }}</p>
      <p>{{ pageData.message }}</p>
      <button @click="getData">更新</button>
    </div>
    <!-- <AppAlert> This is an auto-imported component </AppAlert> -->
  </div>
</template>
<script setup lang="ts">
const id = ref("");
const pageData = reactive({ message: "" });
onMounted(async () => {
  id.value = uuid();
  console.log(id.value);
  console.log(randomRange(1, 10));
});
const getData = async () => {
  const { data } = await useFetch("/api/test");
  pageData.message = data.value?.body.message;
  console.log(data);
};
getData();
</script>
<style scoped></style>
