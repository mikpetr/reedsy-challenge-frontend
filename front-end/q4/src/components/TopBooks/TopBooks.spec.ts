import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import booksApi from '@/api/books'
import TopBooks from './TopBooks.vue'
import TopBooksItem from './TopBooksItem.vue'

describe('TopBooks.vue', () => {
  const mockData = {
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    data: {
      books: [
        {
          slug: 'test-1',
        }, 
        {
          slug: 'test-2',
        }
      ]
    }
  }

  vi.spyOn(booksApi, 'getBooks').mockResolvedValue(mockData)

  it('Should make one request to back end for getting books list', async () => {
    mount(TopBooks)
    expect(booksApi.getBooks).toHaveBeenCalledTimes(1)
  })

  it('Should render TopBooksItem component after loading data', async () => {
    const wrapper = mount(TopBooks)

    // Wait until the DOM updates.
    await flushPromises()

    const books = wrapper.findAllComponents(TopBooksItem)

    expect(books).toHaveLength(2)
  })
})