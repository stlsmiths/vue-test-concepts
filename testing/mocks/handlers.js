import { rest } from 'msw'
import {events} from '@/../events-db.json'
import {isNumeric} from "../../src/common/utility-funcs";

export const handlers = [
  rest.get('https://localhost:3000/events', (req, res, ctx) => {
    let data = { message: 'Hello from Vue Mastery!' }
    data = events
    // data = { data: events }
    return res( ctx.status(200), ctx.json(data) )
  }),
  rest.get('/events', (req, res, ctx) => {
    let data = { message: 'Hello from Vue Mastery!' }
    data = events
    // data = { data: events }
    return res( ctx.status(200), ctx.json(data) )
  }),

  rest.get('https://localhost:3000/events/:id', (req, res, ctx) => {
    let data
    let id = req.params.id
    id = isNumeric(id) ? parseInt(id) : ''+id
    let event = req.params.id ? events.find( e => e.id === id) : {}
    data = event
    // data = { data: events }
    return res( ctx.status(200), ctx.json(data) )
  }),
  rest.get('/events/:id', (req, res, ctx) => {
    let data
    let id = req.params.id
    id = isNumeric(id) ? parseInt(id) : ''+id
    let event = req.params.id ? events.find( e => e.id === id) : {}
    data = event
    // data = { data: events }
    return res( ctx.status(200), ctx.json(data) )
  })

]
