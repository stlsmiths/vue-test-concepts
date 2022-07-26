import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import {useEvents} from '../events-store'

// @ts-ignore
import {events} from '../../../events-db.json'

describe('Events Store', () => {
  let store: any
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    store = useEvents()
  })

  it('fetches', async () => {
    const eventsRtn = await store.fetchEvents()
    expect(store.events).toHaveLength( events.length )
  })

})
