<template>
  <div>
    <h3>index</h3>
    <div class="mt-10px">
      <el-button>
        <nuxt-link to="/user/list" class="decoration-none"> 用户列表 </nuxt-link>
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const id = ref("");
const pageData = reactive({ message: "" });
onMounted(async () => {
  id.value = uuid();
});
</script>
<style scoped></style>
