<!--
 * @Date: 2024-12-19 14:28:23
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-23 15:24:49
 * @FilePath: \nuxt-app1\pages\user\add.vue
-->
<template>
  <div>
    <el-button @click="$router.back()"> 返回 </el-button>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import md5 from "md5";
const router = useRouter();
interface RuleForm {
  username: string;
  email: string;
  password: string;
}
const ruleFormRef = ref();
const ruleForm = reactive<RuleForm>({
  username: "",
  email: "",
  password: "",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const submitForm = async (formEl: any | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields: any) => {
    if (valid) {
      console.log("submit!");
      createUser();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const createUser = async () => {
  const data = await $fetch("/api/user/create", {
    method: "POST",
    body: {
      ...ruleForm,
      password: md5(ruleForm.password),
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (data.code == 200) {
    ElMessage.success("添加成功");
    // 跳转到列表页
    router.push("/user/list");
  } else {
    ElMessage.error(data.error);
  }
};
</script>
