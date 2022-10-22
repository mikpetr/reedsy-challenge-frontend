import { createRouter, createWebHistory } from 'vue-router'
import TopBooks from '@/components/TopBooks/TopBooks.vue'
import Book from '@/components/Book/Book.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: TopBooks,
    },
    {
      name: 'book',
      path: '/book/:slug',
      props: true,
      component: Book,
    },
  ]
})

export default router