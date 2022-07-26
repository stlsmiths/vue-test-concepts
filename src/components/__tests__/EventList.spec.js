import {describe,it,expect,beforeEach,beforeAll,vi} from 'vitest'
import { mount } from '@vue/test-utils'
import {nextTick} from "vue";
import router from '@/router'

import { setActivePinia, createPinia } from 'pinia'
import {createTestingPinia} from "@pinia/testing";

import {useEvents} from '../../stores/events-store'

import EventList from '@/components/EventList.vue'
import { events as mockEvents } from '../../../events-db.json'

function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}
  return mount(EventList, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn
        }),
        router
      ]
    },
    ...config.mountOptions
  })
}

describe('EventList', () => {
  let store, wrapper

  beforeEach(() => {
    wrapper = mountEventList()
    setActivePinia(createPinia())
    store = useEvents()
  })

  it('should render the events', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      const title = wrapper.find('[data-testid=event-list-title]')
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })

  describe('events', async () => {

    beforeEach( async () => {
      await store.fetchEvents()
    })

    it.skip('are rendered in a list with necessary information', async () => {
      // wrapper = mountEventList()
/*
          {
        plugins: {
          store: {
            state: () => ({
              events: mockEvents
            })
          }
        }
      })
*/
      await nextTick()
      // await store.fetchEvents()
      console.log(wrapper.vm.events )

      expect( wrapper.vm.events ).toHaveLength( 9 )

      const events = wrapper.findAll('[data-testid=event]')
      expect(events).toHaveLength(mockEvents.length)

      events.forEach((event, i) => {
        const eventText = event.text()
        expect(eventText).toContain(mockEvents[i].title)
        expect(eventText).toContain(mockEvents[i].date)
      })
    })
  })
})
