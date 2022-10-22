import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount, enableAutoUnmount } from '@vue/test-utils'
import booksApi from '@/api/books'
import Book from './Book.vue'
import BookMock from './Book.mock'

enableAutoUnmount(afterEach)

const mockCall = vi.spyOn(booksApi, 'getBook').mockResolvedValue(BookMock)

describe('Book.vue', () => {
  it('Should make one request to back end to load book data', () => {
    mount(Book, {
      props: {
        slug: 'test'
      }
    })

    expect(booksApi.getBook).toHaveBeenCalledTimes(1)
  })

  it('Should not make back end call if slug is not provided', () => {
    mockCall.mockClear()
    
    mount(Book)
    
    expect(booksApi.getBook).toHaveBeenCalledTimes(0)
  })
})