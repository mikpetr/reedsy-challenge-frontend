import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import booksApi from '@/api/books'
import Book from './Book.vue'

describe('Book.vue', () => {
  const mockData = {
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    data: {}
  }
  
  const mockCall = vi.spyOn(booksApi, 'getBook').mockResolvedValue(mockData)

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