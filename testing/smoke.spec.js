import axios from 'axios'
import {it,expect} from 'vitest'
import {events} from '../events-db.json'

describe('Mock axios requests', () => {
  it('api request events works', async () => {
    const result = await axios.get('https://localhost:3000/events')
    // console.log(result)
    expect( result.data ).toEqual( events  )
  })


  it('api request events/id works', async () => {
    const result = await axios.get('https://localhost:3000/events/123')
    const event = events.find( e => e.id === 123 )
    // console.log(result.data)
    expect( result.data ).toEqual( event )
  })

})
