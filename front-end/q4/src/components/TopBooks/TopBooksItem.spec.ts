import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TopBooksItem from './TopBooksItem.vue'

describe('TopBooksItem.vue', () => {
  it('Should add ellipsis if synopsis', () => {
    const wrapper = mount(TopBooksItem, {
      props: {
        data: {
          synopsis: "In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth. In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
        },
      }
    })

    expect(wrapper.find('[data-test="synopsis"]').text().length).toBeLessThan(204)
  })

  it('Should have primary vote button if not upvoted', () => {
    const wrapper = mount(TopBooksItem, {
      props: {
        data: {
          upvoted: false,
        },
      }
    })

    const button = wrapper.find('[data-test="vote-button"]')
    expect(button.classes('upvoted')).toBe(false)
  })

  it('Should have inversed vote button if already upvoted', () => {
    const wrapper = mount(TopBooksItem, {
      props: {
        data: {
          upvoted: true,
        },
      }
    })

    const button = wrapper.find('[data-test="vote-button"]')
    expect(button.classes('upvoted')).toBe(true)
  })
})