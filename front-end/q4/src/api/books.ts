import api from './api'
import { AxiosResponse } from 'axios'
import { Book, BooksResponse } from '@/interfaces/Book'

export default {
  getBooks(): Promise<AxiosResponse<BooksResponse>> {
    return api.get('books')
  },
  getBook({ slug }: { slug: string }): Promise<AxiosResponse<Book>> {
    return api.get(`books/${slug}`)
  }
}