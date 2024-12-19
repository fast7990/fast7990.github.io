<template>
  <div>
    <div>
      <el-button>
        <nuxt-link to="/user/add" class="decoration-none"> 添加用户 </nuxt-link>
      </el-button>
      <el-button @click="getData"> 搜索 </el-button>
    </div>
    <el-table :data="pageData.tableData" style="width: 100%">
      <el-table-column prop="username" label="username" />
      <el-table-column prop="email" label="email" />
      <el-table-column prop="status" label="status" />
      <el-table-column prop="create_time" label="create_time" />
    </el-table>
    <el-pagination
      class="mt-4"
      background
      layout="prev, pager, next"
      :total="pageData.total"
      v-model:current-page="pageData.page"
      v-model:page-size="pageData.size"
      @change="getData"
    />
  </div>
</template>
<script setup lang="ts">
const pageData = reactive({
  tableData: [],
  page: 1,
  size: 10,
  total: 0,
});
const getData = async () => {
  const data = await $fetch("/api/user/list", {
    method: "POST",
    params: {
      page: pageData.page,
      pageSize: pageData.size,
    },
  });
  if (data.code == 200) {
    pageData.tableData = data?.data.list;
    pageData.total = data?.data.count;
  }
};
getData();
</script>
