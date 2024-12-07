<template>
  <h1>{{ title }}</h1>
  <div v-for="todo in todos">
    <p>to: {{ todo.to }}</p>
    <p>do: {{ todo.do }}</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios';
  const title = ref("ToDoリスト")
  const todos = ref([])

  const todosData = async () => {
    const response = await axios.get('http://localhost:3000/api/todos').then(response => {
      todos.value = response.data;
      console.log("成功:", response.data)
    }).catch(error => {
      console.error("失敗：", error)
    })
  };

onMounted(todosData)
</script>
