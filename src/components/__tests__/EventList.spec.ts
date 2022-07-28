import {describe,it,expect,beforeEach,beforeAll,vi} from 'vitest'
import {mount} from '@vue/test-utils'
import router from '@/router'

import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from "@pinia/testing";

import {useEvents} from '@/stores/events-store'
import EventList from '@/components/EventList.vue'
import EventCard from '@/components/EventCard.vue'
// @ts-ignore
import { events as mockEvents } from '@/../events-db.json'

function mountEventList(config: any = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || []
  return mount(EventList, {
    global: {
      plugins: [
        createTestingPinia({
          // stubActions: false,
          // createSpy: vi.fn,
          initialState: {
            events: {
              events: mockEvents
            }
          }
        }),
        router,
        ...config.plugins
      ]
    },
    ...config.mountOptions
  })
}

describe('EventList', () => {
  let store: any, wrapper: any

  beforeEach(() => {
    wrapper = mountEventList({
        components: { EventCard }
    })
    setActivePinia( createPinia() )
    store = useEvents()
  })

  it('should render the events', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('is rendered with the correct text', () => {
    const title = wrapper.find('[data-testid=event-list-title]')
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Good')
  })

  describe('events', async () => {
    let fevents: any
    beforeEach( async () => {
      fevents = await store.fetchEvents()
    })

    it('finds events from store', () => {

      expect( fevents ).toBeTruthy()
      expect( fevents.data ).toHaveLength( mockEvents.length )

      expect( store.events ).toHaveLength( mockEvents.length )
    })

    it('renders events list of proper length and with list contents', () => {

      expect( store.events ).toHaveLength( mockEvents.length )
      expect( wrapper.vm.events ).toHaveLength( mockEvents.length )

      const events = wrapper.findAll('[data-testid="event-link"]')
      expect( events ).toHaveLength( mockEvents.length )
      events.forEach((event, i) => {
        const eventText = event.text()
        expect( eventText ).toContain(mockEvents[i].title)
        expect( eventText ).toContain(mockEvents[i].date)
      })
    })

  })
})
