<template>
  <v-card
    class="mx-auto"
    width="400"
  >
    <template v-slot:title>
      <v-icon color="warning" icon="mdi-alert" size="small"></v-icon>
      <span class="font-weight-black">TODO:{{ todoID }}</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
      to: {{ todo.to }}
    </v-card-text>
    <v-card-text class="bg-surface-light pt-4">
      do: {{ todo.do }}
    </v-card-text>

  </v-card>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios';

  const todo = ref('')
  const route = useRoute()
  const todoID = route.params.id

  const showTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/todos/${todoID}`);
      todo.value = response.data;
    } catch (error) {
      console.error("リクエスト失敗", error);
    };
  }
  onMounted(showTodo)
</script>