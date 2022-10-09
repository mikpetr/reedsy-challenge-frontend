<script setup lang="ts">
  import { ref } from 'vue'
  import TopBooksItem from './TopBooksItem.vue';
  import booksApi from '@/api/books'
  import { Book } from '@/types/Book'

  let books = ref<Array<Book>>([])

  async function getBooks() {
    const res = await booksApi.getBooks()
    books.value = res?.data?.books
  }

  getBooks()
</script>

<template>
  <div class="container">
    <h1>Top books of all time</h1>
    <TopBooksItem
      v-for="(book, index) in books" 
      :data="book"
      :index="index"
      class="top-books-item"
      data-test="top-book"
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
