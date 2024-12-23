<!--
 * @Date: 2024-12-05 18:30:05
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-23 17:24:57
 * @FilePath: \nuxt-app1\pages\system\dict\list.vue
-->
<template>
  <div>
    <div>
      <nuxt-link to="/user/add" class="decoration-none">
        <el-button>添加用户</el-button>
      </nuxt-link>
      <el-button class="ml-3" @click="getData"> 搜索 </el-button>
    </div>
    <el-table :data="pageData.tableData" style="width: 100%">
      <el-table-column prop="name" label="name" />
      <el-table-column prop="code" label="code" />
      <el-table-column prop="status" label="status" />
      <el-table-column prop="create_time" label="create_time" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-popconfirm
            width="220"
            icon-color="#626AEF"
            title="确认要删除用户?"
            confirm-button-text="是"
            cancel-button-text="否"
            @confirm="handleClick(scope, 1)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" size="small" @click="handleClick(scope, 2)">
            编辑
          </el-button>
        </template>
      </el-table-column>
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
const router = useRouter();
const pageData = reactive({
  tableData: [],
  page: 1,
  size: 10,
  total: 0,
});
const handleClick = (scope: any, type: number) => {
  console.log(scope, type);
  if (type == 1) {
    $fetch("/api/sys/dict/delete", {
      method: "POST",
      params: {
        id: scope.row.id,
      },
    }).then((res) => {
      if (res && res.code == 200) {
        getData();
      }
    });
  } else if (type == 2) {
    router.push({
      path: "/system/dict/" + scope.row.id,
    });
  }
};
const getData = async () => {
  const res = await $fetch("/api/sys/dict/list", {
    method: "POST",
    params: {
      page: pageData.page,
      pageSize: pageData.size,
    },
  });
  if (res && res.code == 200) {
    pageData.tableData = res?.data.list;
    pageData.total = res?.data.count;
  }
};
const cancelEvent = () => {
  console.log("取消");
};
getData();
</script>
