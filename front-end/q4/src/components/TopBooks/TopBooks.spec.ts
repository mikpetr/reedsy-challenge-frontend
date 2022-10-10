import { mount, flushPromises, enableAutoUnmount } from '@vue/test-utils'
import { describe, it, expect, vi, afterEach } from 'vitest'
import booksApi from '@/api/books'
import TopBooks from './TopBooks.vue'
import TopBooksItem from './TopBooksItem.vue'

enableAutoUnmount(afterEach)

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
          title: 'title1',
          synopsis: 'synopsis test 1'
        }, 
        {
          slug: 'test-2',
          title: 'title2',
          synopsis: 'synopsis test 2'
        }
      ]
    }
  }
  
  vi.spyOn(booksApi, 'getBooks').mockResolvedValue(mockData)

  it('Should make one request to back end for getting books list', () => {
    mount(TopBooks)

    expect(booksApi.getBooks).toHaveBeenCalledTimes(1)
  })

  it('Should render TopBooksItem component after loading data', async () => {
    const wrapper = mount(TopBooks)
    
    await flushPromises()
    
    const books = wrapper.findAllComponents(TopBooksItem)
    expect(books).toHaveLength(2)
  })

  it('Should not render books that don\'t match filter criteria ', async () => {
    const wrapper = mount(TopBooks)

    await flushPromises()

    const search = wrapper.find('[data-test="search"]')
    await search.setValue('title1')
    
    const books = wrapper.findAllComponents(TopBooksItem)
    expect(books.map(item => item.text()).join('')).not.toContain('synopsis test 2')
  })

  it('Should render books that matches filter criteria ', async () => {
    const wrapper = mount(TopBooks)
    
    await flushPromises()
    
    const search = wrapper.find('[data-test="search"]')
    await search.setValue('title1')

    const books = wrapper.findAllComponents(TopBooksItem)

    expect(books.map(item => item.text()).join('')).toContain('synopsis test 1')
  })
})