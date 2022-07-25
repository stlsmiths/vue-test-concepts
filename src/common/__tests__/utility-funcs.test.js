import {describe,it,expect,beforeEach,beforeAll} from 'vitest'
import {isEqualObjects,isObject} from '../utility-funcs'

describe('utility functions', () => {

  describe('isObject', () => {
    it('simple objects', () => {
      expect( isObject({})).toBe( true )
      expect( isObject({ a: true, b: new Date() })).toBe( true )
      expect( isObject(new Date())).toBe( true )
      expect( isObject( [] )).toBe( true )

      expect( isObject(1) ).toBe( false )
      expect( isObject( true ) ).toBe( false )
      expect( isObject(null) ).toBe( false )
    })
  })

  describe('isEqualObjects', () => {
    let o1, o2

    beforeEach( () => {
      o1 = { a: 123, b: 'Test item 1', c: 987.123, d: new Date('11/10/2008') }
      o2 = { first: 'George', lsat: 'Harrison', age: 34 }
    })

    it('should compare objects properly', () => {
      const local1 = {...o1}
      expect( isEqualObjects(o1,local1) ).toEqual( true )
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

    it('should properly compare two dates', () => {
      // const local1 = {...o1, d: new Date()}
      expect(isEqualObjects( new Date('3/12/2009'),new Date('3/12/2009') )).toBe( true )
      expect(isEqualObjects( { a:1, d: new Date('3/12/2009')},{ a:2, d: new Date('3/12/2009')} )).toBe( false )
      expect(isEqualObjects( { a:1, d: new Date('3/12/2009')},{ a:2, d:'3/12/2009'} )).toBe( false )
    })

    it('should properly compare two complex nested objects', () => {
      // const local1 = {...o1, d: new Date()}
      const l1 = {...o1, details: {
          date: '11/09/2018',
          pointer: 1298
        }}
      const l2 = {...o1, details: {
          date: '11/09/2018',
          pointer: 1298
        }}
      const l3 = {...o1, moreDetails: {
          dateStr: '11/09/2018',
          pointer: 982
        }}

      expect(isEqualObjects( l1,l2 )).toBe( true )
      expect(isEqualObjects( l1,l3 )).toBe( false )
    })

    it('should be true for both null objects', () => {
      expect( isEqualObjects({},{}) ).toBeTruthy()
    })

    it('should catch dissimilar objects', () => {
      expect( isEqualObjects(o1,o2) ).toBe( false )
      expect( isEqualObjects(o1,{ name: 'test'}) ).toBe( false )
    })

    it('should catch null / undefined', () => {
      expect( isEqualObjects( 1, 2 ) ).toBe( false )
    })

  })
})
