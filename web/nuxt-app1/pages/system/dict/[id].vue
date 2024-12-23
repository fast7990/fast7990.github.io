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
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            更新
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script setup lang="ts">
  import md5 from "md5";
  const router = useRouter();
  const route = useRoute();
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
  const getUser = async () => {
    const data = await $fetch("/api/user/get", {
      method: "POST",
      query: {
        id: route.params.id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.code == 200) {
      Object.assign(ruleForm, data.data[0]);
    } else {
      ElMessage.error(data.error);
    }
  };
  getUser();
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
    const data = await $fetch("/api/user/update", {
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
      ElMessage.success("修改成功");
      // 跳转到列表页
      router.push("/user/list");
    } else {
      ElMessage.error(data.error);
    }
  };
  </script>
  