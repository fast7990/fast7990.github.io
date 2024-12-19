<template>
  <div>
    <el-button @click="$router.back()"> 返回 </el-button>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="password" prop="password">
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
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please input Activity email", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "Please input Activity password",
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
