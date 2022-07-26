import { rest } from 'msw'
import {events} from '../../events-db.json'

export const handlers = [
  rest.get('/events', (req, res, ctx) => {
    let data = { message: 'Hello from Vue Mastery!' }
    data = { data: events }
    return res(ctx.status(200), ctx.json(data))
  })
]
