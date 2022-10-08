import api from './api'

export default {
  getBooks() {
    return api.get('books')
  },
  getBook({ slug }: { slug: string }) {
    return api.get(`books/${slug}`)
  }
}