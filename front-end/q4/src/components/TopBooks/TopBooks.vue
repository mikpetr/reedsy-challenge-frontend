<script setup lang="ts">
  import { reactive } from 'vue'
  import TopBooksItem from './TopBooksItem.vue';
  import booksApi from '@/api/books'

  const state = reactive({
    books: []
  })

  async function getBooks() {
    const books = await booksApi.getBooks()
    state.books = books.data.books
  }

  getBooks()
</script>

<template>
  <div class="container">
    <h1>Top books of all time</h1>
    <TopBooksItem
      v-for="(book, index) in state.books" 
      :data="book"
      :index="index"
      class="top-books-item"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/variables';

h1 {
  text-align: center;
  color: variables.$light-orange;
  margin: 0;
  padding: 1.5rem 0;
}

.top-books-item {
  &:nth-child(even) {
    background-color: white;
  }
  
  &:nth-child(odd) {
    background-color: variables.$main-color;
  }
}
</style>
