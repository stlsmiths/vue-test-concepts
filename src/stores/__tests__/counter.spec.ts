import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import {useCounterStore} from '../counter'

const mockString = 'bear,hummingbird,praying mantis'
const mockTags = mockString.split(',')

describe('Counter Store', () => {
  let cstore: any
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    cstore = useCounterStore()
  })

  it('increments', () => {
    expect(cstore.counter).toBe(0)
    cstore.increment()
    expect(cstore.counter).toBe(1)
  })

  it('increments by amount', () => {
    cstore.increment(10)
    expect(cstore.counter).toBe(10)
  })

  it('getter returns proper double amount', () => {
    cstore.increment(7)
    expect(cstore.counter).toBe(7)
    expect(cstore.doubleCount).toBe(14)
  })

  describe('myTags', () => {
    it('defaults to none', () => {
      expect( cstore.myTags ).toHaveLength(0)
    })
    it('defaults to empty array', () => {
      expect( cstore.myTags ).toEqual([])
    })
    it('allows direct mutations', () => {
      cstore.myTags = [...mockTags]
      expect( cstore.myTags ).toHaveLength(3)
    })
    it('allows direct mutations', () => {
      cstore.myTags = [...mockTags]
      expect( cstore.myTags ).toHaveLength(3)
    })
  })

  describe('getters', () => {
    it('should return proper item for initial setting', () => {
      expect(cstore.getMyTag()).toBe('')
    })
    it('should return proper item after mutting', () => {
      cstore.myTags = [...mockTags]
      expect(cstore.getMyTag()).toBe('bear')
      expect(cstore.getMyTag(1)).toBe('hummingbird')
    })
  })

  describe('actions', () => {
    it('should set tags by default to initTags', () => {
      cstore.resetMyTags()
      expect( cstore.myTags ).toHaveLength(5)
      expect( cstore.myTags[0] ).toBe('beer')
    })
    it('should add and split csv string of tags', () => {
      cstore.resetMyTags(mockString)
      expect( cstore.myTags ).toHaveLength( mockTags.length )
      expect( cstore.myTags[0] ).toBe( mockTags[0] )
      expect( cstore.myTags[1] ).toBe( mockTags[1] )
      expect( cstore.myTags[2] ).toBe( mockTags[2] )
    })
    it('should add array of tags', () => {
      cstore.resetMyTags(mockTags)
      expect( cstore.myTags ).toHaveLength( mockTags.length )
      expect( cstore.myTags[0] ).toBe( mockTags[0] )
      expect( cstore.myTags[1] ).toBe( mockTags[1] )
      expect( cstore.myTags[2] ).toBe( mockTags[2] )
    })
  })

})
