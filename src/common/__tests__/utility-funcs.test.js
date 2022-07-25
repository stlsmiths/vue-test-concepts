import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import {isEqualObjects} from '../utility-funcs'

describe('utility functions', () => {
  describe('isEqualObjects', () => {
    let o1, o2
    beforeEach( () => {
      o1 = { a: 123, b: 'Test item 1', c: 987.123, d: new Date('11/10/2008') }
      o2 = { first: 'George', lsat: 'Harrison', age: 34 }
    })
    it('should compare objects properly', () => {
      const local1 = {...o1}
      expect(isEqualObjects(o1,local1)).toBeTruthy()
      expect(o1.d).toEqual(local1.d)
    })
    it('should compare the same objects properly - after a change', () => {
      const local1 = {...o1}
      const local1new = local1
      expect(isEqualObjects( local1, local1new) ).toBeTruthy()
      local1new.a = 5
      expect(isEqualObjects( local1, local1new) ).toBeTruthy()   // they are the same object
    })
    it('should properly catch changed objects', () => {
      const local1 = {...o1, d: new Date()}
      expect(isEqualObjects(o1,local1)).toBeFalsy()
      expect(o1.d).not.toEqual(local1.d)
    })
    it('should be true for both null objects', () => {
      expect( isEqualObjects({},{}) ).toBeTruthy()
    })
  })
})
