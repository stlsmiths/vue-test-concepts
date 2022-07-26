import axios from 'axios'
import {it,expect} from 'vitest'
import {events} from '../events-db.json'

it('works', async () => {
  const result = await axios.get('/events')

  // console.log(result.data)
  expect( result.data ).toEqual( { data: events }  )
})
