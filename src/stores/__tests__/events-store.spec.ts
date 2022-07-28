import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import {useEvents} from '../events-store'

// @ts-ignore
import {events} from '@/../events-db.json'

describe('Events Store', () => {
  let store: any
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    store = useEvents()
  })

  it('fetches events properly', async () => {
    const eventsRtn = await store.fetchEvents()
    expect( eventsRtn.data ).toHaveLength( events.length )
    expect( store.events ).toHaveLength( events.length )
  })

 it('getter getById works properly', async () => {
    await store.fetchEvents()
    let event = events[5]
    let nevt = events.length - 1
    expect( store.getById(event.id) ).toEqual( event )
    expect( store.getById(events[2].id) ).toEqual( events[2] )
    expect( store.getById(events[nevt].id) ).toEqual( events[nevt] )
    expect( store.getById('abc')).toEqual( {} )
  })

 it('action eventById works properly', async () => {
    await store.fetchEvents()
    let event = events[5]
    let nevt = events.length - 1
    expect( store.eventById(event.id) ).toEqual( event )
    expect( store.eventById(events[2].id) ).toEqual( events[2] )
    expect( store.eventById(events[nevt].id) ).toEqual( events[nevt] )
    expect( store.eventById('abc')).toEqual( {} )
  })
})
