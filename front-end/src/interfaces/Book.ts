export interface Book {
  title: string
  author: string
  upvotes: number
  upvoted: boolean
  cover: string
  synopsis: string
  rating: number
}

export interface BooksResponse {
  books: Book[]
  meta: any
}