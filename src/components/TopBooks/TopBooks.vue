<script setup lang="ts">
  import { ref } from 'vue'
  import TopBooksItem from './TopBooksItem.vue';
  import booksApi from '@/api/books'
  import { Book } from '@/interfaces/Book'

  const books = ref<Book[]>([])
  const filteredBooks = ref<Book[]>([])

  const getBooks = async (): Promise<void> => {
    const res = await booksApi.getBooks()
    books.value = res?.data?.books
    filteredBooks.value = books.value
  }

  const searchBooks = (e: Event): void => {
    const searchTerm = (e?.target as HTMLInputElement).value?.toLowerCase()
    
    filteredBooks.value = books.value.filter((book: Book) => {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.synopsis.toLowerCase().includes(searchTerm)
      )
    })
  }

  getBooks()
</script>

<template>
  <div class="container">
    <h1>Top books of all time</h1>
    <div class="search">
      <input @input="searchBooks" type="text" placeholder="Search..." data-test="search" />
    </div>
    <div v-if="!filteredBooks.length">
      <h3 class="error">Nothing is found</h3>
    </div>
    <div v-else>
      <TopBooksItem
        v-for="(book, index) in filteredBooks" 
        :data="book"
        :index="index"
        class="top-books-item"
        data-test="top-book"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/variables';

  .container {
    padding-bottom: 1.5rem;
  }

  h1 {
    text-align: center;
    color: variables.$light-orange;
    margin: 0;
    padding: 1.5rem 0;
  }

  .error {
    text-align: center;
    color: rgb(226, 104, 104);
  }

  .search {
    text-align: center;
    margin-bottom: 1.5rem;

    input {
      font-size: 1rem;
      line-height: 1.8rem;
      padding: 0 1rem;
      border: 1px solid variables.$light-orange;
      border-radius: 8px;
      outline-color: variables.$dark-orange;
    }
  }

  .top-books-item {
    &:nth-child(odd) {
      background-color: white;
    }
    
    &:nth-child(even) {
      background-color: variables.$main-color;
    }
  }
</style>
