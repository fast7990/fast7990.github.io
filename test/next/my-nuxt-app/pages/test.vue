<template>
  <div class="container">
    <div class="card">
      <h1>用户信息表单</h1>
      <p>请输入您的个人信息并提交表格</p>

      <!-- 表单区域 -->
      <form @submit.prevent="submitForm" class="form-container">
        <div class="form-group">
          <label for="name">姓名:</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="请输入姓名"
            required
          />
        </div>

        <div class="form-group">
          <label for="age">年龄:</label>
          <input
            type="number"
            id="age"
            v-model.number="formData.age"
            placeholder="请输入年龄"
            min="1"
            max="120"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">邮箱:</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="请输入邮箱地址"
            required
          />
        </div>

        <button type="submit" class="submit-btn">提交信息</button>
        <NuxtLink to="/" class="back-link">← 返回首页</NuxtLink>
      </form>

      <!-- 数据表格 -->
      <div class="table-container">
        <h2>已提交的信息</h2>
        <table>
          <thead>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>邮箱</th>
              <th>提交时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, index) in people" :key="index">
              <td>{{ person.name }}</td>
              <td>{{ person.age }}</td>
              <td>{{ person.email }}</td>
              <td>{{ person.timestamp }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// 表单数据
const formData = reactive({
  name: "",
  age: 0,
  email: "",
});

// 人员数据列表
const people = reactive([
  { name: "张三", age: 25, email: "zhangsan@example.com", timestamp: "2023-01-15 10:30" },
  { name: "李四", age: 30, email: "lisi@example.com", timestamp: "2023-01-16 14:20" },
  { name: "王五", age: 35, email: "wangwu@example.com", timestamp: "2023-01-17 09:15" },
]);

// 提交表单
function submitForm() {
  // 获取当前时间戳
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 添加新人员到列表
  people.push({
    name: formData.name,
    age: formData.age,
    email: formData.email,
    timestamp: timestamp,
  });

  // 重置表单
  formData.name = "";
  formData.age = 0;
  formData.email = "";

  // 显示成功消息
  alert("信息提交成功！");
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 800px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}

p {
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
}

.back-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin: 1rem 0;
  border: 2px solid #3498db;
}

.back-link:hover {
  background-color: #3498db;
  color: white;
}

/* 表单样式 */
.form-container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.submit-btn {
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  width: 100%;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(52, 152, 219, 0.4);
}

.submit-btn:active {
  transform: translateY(0);
}

/* 表格样式 */
.table-container {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #f8f9fa;
}

th {
  background: #3498db;
  color: white;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  color: #2c3e50;
}

tr:nth-child(even) {
  background-color: #f1f3f5;
}

tr:hover {
  background-color: #e3f2fd;
  transform: scale(1.01);
  transition: all 0.2s ease;
}

/* Animation for new rows */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

tr {
  animation: fadeIn 0.5s ease forwards;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card {
    padding: 1.5rem;
    margin: 1rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  th, td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
