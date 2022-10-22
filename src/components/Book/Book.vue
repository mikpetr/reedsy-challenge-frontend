<script setup lang="ts">
  import { ref } from 'vue';
  import booksApi from '@/api/books'
  import { Book } from '@/interfaces/Book'

  const props = defineProps(['slug'])

  const book = ref<Book>()

  const getBookData = async (slug: string): Promise<void> => {
    const res = await booksApi.getBook({ slug })
    book.value = res?.data
  }

  if (props.slug) {
    getBookData(props.slug)
  }
</script>

<template>
  <div class="container" v-if="book">
    <header>
      <div>
        <h1>{{ book.title }}</h1>
        <div class="author">{{ book.author }}</div>
      </div>

      <div class="upvotes">
        Upvoted {{ book.upvotes }} times
        <button :class="{ 'upvoted': book.upvoted }">
          {{ book.upvoted ? 'Upvoted' : 'Upvote' }}
        </button>
      </div>
    </header>

    <div class="cover">
      <img :src="book.cover" :alt="book.title" />
    </div>

    <h3>Synopsis</h3>
    <p>
      {{ book.synopsis }}
    </p>
    
    <h4>Rating: {{ book.rating }}/10</h4>
  </div>
</template>

<style scoped lang="scss">
  @use "@/variables";

  .container {
    background-color: white;
    padding: 2rem;

    header {
      display: flex;
      justify-content: space-between;

      h1 {
        color: variables.$dark-orange;
        margin: 0;
        line-height: 36px;
      }

      .author {
        margin-top: 0.5rem;
        font-style: italic;
      }

      .upvotes {
        line-height: 36px;

        button {
          margin-left: 0.7rem;
        }
      }
    }

    .cover {
      img {
        max-height: 400px;
        display: block;
        margin: 2em auto;
      }
    }
  }
</style>