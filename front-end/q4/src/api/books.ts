import api from './api'

export default {
  getBooks() {
    return api.get('books')
  }
}