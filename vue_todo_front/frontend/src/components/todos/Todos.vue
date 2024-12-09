<template>
  <h1>{{ title }}</h1>
  <div v-for="todo in todos">
    <p>to: {{ todo.to }}</p>
    <p>do: {{ todo.do }}</p>
  </div>
  <form @submit.prevent="postTodo">
    <div>
      <label for="to">to:</label>
      <input type="text" id="to" v-model="newTodo.to">
      <p v-if="errorTodo.to">error: {{ errorTodo.to[0]}}</p>
    </div>
    <div>
      <label for="do">do:</label>
      <input type="text" id="do" v-model="newTodo.do">
      <p v-if="errorTodo.do">error: {{ errorTodo.do[0] }}</p>
    </div>
    <input type="submit" value="登録">
  </form>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios';
  const title = ref("ToDoリスト")
  const todos = ref([])
  const newTodo = ref({ to:'', do:'' })
  const errorTodo = ref([])

  const todosData = () => {
    axios.get('http://localhost:3000/api/todos').then(response => {
      todos.value = response.data;
      console.log("成功:", response.data)
    }).catch(error => {
      console.error("失敗：", error)
    });
  }

onMounted(todosData)

const postTodo = async () => {
  try {
    const postResponse = await axios.post('http://localhost:3000/api/todos', {
    todo: newTodo.value,
  });

  if (postResponse.data.errors) {
    console.log(postResponse.data.errors)
    errorTodo.value = postResponse.data.errors;
  } else {
    todos.value.push(postResponse.data);
    newTodo.value = { to: '', do: '' };
  };
  } catch (error) {
    console.error("postリクエスト失敗", error)
  }
  }
</script>
