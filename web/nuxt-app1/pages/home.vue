<template>
  <div>
    <h4>home</h4>
    <p><nuxt-link :to="`/user/${id}?data=1`">user</nuxt-link></p>
    <p><nuxt-link to="/about">About</nuxt-link></p>
    <input type="text" v-model="id" />
  </div>
</template>
<script setup lang="ts">
const id:string = ref("");
</script>
