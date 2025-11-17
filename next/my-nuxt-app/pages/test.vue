<template>
  <div class="container">
    <div class="card">
      <h1>About Page</h1>
      <p>This is the about page of our Nuxt.js application.</p>
      <NuxtLink to="/" class="back-link">← Back to Home</NuxtLink>
      <p><button @click="addPerson" class="add-btn">Add Person</button></p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.name">
              <td>{{ person.name }}</td>
              <td>{{ person.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// 关于页面逻辑
const people = reactive([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
]);

// 添加人员
function addPerson() {
  // 向人员数组添加新人员随机名字年龄
  people.push({ name: "David", age: Math.floor(Math.random() * 100) });
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
  max-width: 600px;
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
  margin-bottom: 1.5rem;
  border: 2px solid #3498db;
}

.back-link:hover {
  background-color: #3498db;
  color: white;
}

.add-btn {
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
  margin: 1.5rem 0;
}

.add-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px rgba(52, 152, 219, 0.4);
}

.add-btn:active {
  transform: translateY(0);
}

.table-container {
  overflow-x: auto;
  margin-top: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
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
</style>
