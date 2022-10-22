<script setup lang="ts">
  const props = defineProps(['data', 'index'])

  const getSynopsis = (): string => {
    if (props?.data?.synopsis?.length > 203) {
      return props.data.synopsis.slice(0, 200) + '...'
    } else {
      return props?.data?.synopsis
    }
  }
</script>

<template>
  <div class="top-books-item">
    <div>
      <h2>
        <router-link :to="`/book/${props.data.slug}`">
          {{ props.index + 1 }}. {{ props.data.title }}
          <span class="rating">({{ props.data.rating }}/10)</span>
        </router-link>
      </h2>
      <p class="author">{{ props.data.author }}</p>
      <p data-test="synopsis">
        {{ getSynopsis() }}
      </p>
      <div class="upvotes">
        <button
          :class="{ 'upvoted': props.data.upvoted }"
          data-test="vote-button"
        >
          {{ props.data.upvoted ? 'Upvoted' : 'Upvote'  }}
        </button>
        Upvoted {{ props.data.upvotes }} times
      </div>
    </div>
    <router-link :to="`/book/${props.data.slug}`">
      <img :src="props.data.cover" alt="{{ props.data.title }}" />
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/variables';

  .top-books-item {
    padding: 2rem;
    display: flex;

    img {
      width: 180px;
      margin-left: 1rem;
      border-radius: 16px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 5px;
    }

    h2 {
      color: variables.$dark-orange;
      margin-top: 0;
      line-height: 1.5em;

      .rating {
        font-size: 1rem;
        color: black;
        line-height: inherit;
        font-weight: 400;
      }
    }

    .author {
      font-style: italic;
      margin: 0;
    }

    .upvotes {
      margin-top: 2rem;

      button {
        margin-right: 0.7rem;
      }
    }
  }
</style>