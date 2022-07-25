import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import {useSampleStore} from '../sample-store'

const mockString = 'bear,hummingbird,praying mantis'
const mockTags = mockString.split(',')

describe('Counter Store', () => {
  let store: any
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    store = useSampleStore()
  })

  it('increments', () => {
    expect(store.counter).toBe(0)
    store.increment()
    expect(store.counter).toBe(1)
  })

  it('increments by amount', () => {
    store.increment(10)
    expect(store.counter).toBe(10)
  })

  it('getter returns proper double amount', () => {
    store.increment(7)
    expect(store.counter).toBe(7)
    expect(store.doubleCount).toBe(14)
  })

  describe('myTags', () => {
    it('defaults to none', () => {
      expect( store.myTags ).toHaveLength(0)
    })
    it('defaults to empty array', () => {
      expect( store.myTags ).toEqual([])
    })
    it('allows direct mutations', () => {
      store.myTags = [...mockTags]
      expect( store.myTags ).toHaveLength(3)
    })
    it('allows direct mutations', () => {
      store.myTags = [...mockTags]
      expect( store.myTags ).toHaveLength(3)
    })
  })

  describe('getters', () => {
    it('should return proper item for initial setting', () => {
      expect(store.getMyTag()).toBe('')
    })
    it('should return proper item after mutting', () => {
      store.myTags = [...mockTags]
      expect(store.getMyTag()).toBe('bear')
      expect(store.getMyTag(1)).toBe('hummingbird')
    })
  })

  describe('actions', () => {
    it('should set tags by default to initTags', () => {
      store.resetMyTags()
      expect( store.myTags ).toHaveLength(5)
      expect( store.myTags[0] ).toBe('beer')
    })
    it('should add and split csv string of tags', () => {
      store.resetMyTags(mockString)
      expect( store.myTags ).toHaveLength( mockTags.length )
      expect( store.myTags[0] ).toBe( mockTags[0] )
      expect( store.myTags[1] ).toBe( mockTags[1] )
      expect( store.myTags[2] ).toBe( mockTags[2] )
    })
    it('should add array of tags', () => {
      store.resetMyTags(mockTags)
      expect( store.myTags ).toHaveLength( mockTags.length )
      expect( store.myTags[0] ).toBe( mockTags[0] )
      expect( store.myTags[1] ).toBe( mockTags[1] )
      expect( store.myTags[2] ).toBe( mockTags[2] )
    })
  })

})
