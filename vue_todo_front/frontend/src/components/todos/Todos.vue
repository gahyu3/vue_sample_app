<template>
  <h1>{{ title }}</h1>
  <div v-for="todo in todos.slice(start, end)" class="todo_marigin">
    <v-card variant="tonal">
      <p>id; {{ todo.id }}</p>
      <p>to: {{ todo.to }}</p>
      <p>do: {{ todo.do }}</p>
    </v-card>
  </div>
  <form @submit.prevent="postTodo">
    <v-text-field
      v-model="newTodo.to"
      :error-messages= "errorTodo.to"
      label="TO"
      max-errors="1"
    ></v-text-field>

    <v-text-field
    v-model="newTodo.do"
    :error-messages= "errorTodo.do"
    label="DO"
    max-errors="1"
    ></v-text-field>
    <v-btn>
      <input type="submit" value="登録">
    </v-btn>
  </form>
  <v-pagination
      v-model="currentPage"
      :length="pageCount">
  </v-pagination>
</template>

<script setup>
  import { ref, onMounted, computed, watch } from 'vue'
  import axios from 'axios';
  const title = ref("ToDoリスト")
  const todos = ref([])
  const newTodo = ref({ to:'', do:'' })
  const errorTodo = ref([])
  const currentPage = ref(0)
  const perPage = ref(5);
  const pageCount = computed(() => Math.ceil(todos.value.length / perPage.value));
  const start = ref(0)
  const end = ref(5)

  const todosData = () => {
    axios.get('http://localhost:3000/api/todos').then(response => {
      todos.value = response.data;
      console.log("成功:", response.data)
    }).catch(error => {
      console.error("失敗：", error)
    });
  }

  const changeStart = () => {
    const s = (currentPage.value - 1) * perPage.value;
    const e = s + perPage.value;
    start.value = s
    end.value = e
  }


  watch(currentPage, () => {
    changeStart();
    });
onMounted(todosData)


  const postTodo = async () => {
    try {
      const postResponse = await axios.post('http://localhost:3000/api/todos', {
      todo: newTodo.value,
      });

      if (postResponse.data.errors) {
        console.log(postResponse.data.errors);
        errorTodo.value = postResponse.data.errors;
      } else {
        todos.value.unshift(postResponse.data);
        newTodo.value = { to: '', do: '' };
      };
    } catch (error) {
      console.error("postリクエスト失敗", error);
    };
  };
</script>

<style>
.todo_marigin {
  margin:20px 0 20px 0 ;
}
</style>
