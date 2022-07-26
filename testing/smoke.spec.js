import axios from 'axios'
import {it,expect} from 'vitest'

it('works', async () => {
  const result = await axios.get('/events')

  console.log(result.data)
  expect(true).toBeTruthy()
})
