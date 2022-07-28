import EventService from "./EventService"
import {events} from '@/../events-db.json'

describe('EventService', () => {
  it('exists', () => {
    expect(EventService).toBeTruthy()
  })

  it('getEvents works - from mock server', async () => {
    const resp = await EventService.getEvents()
    expect( resp.data ).toEqual( events )
  })

  it('getEvent works - from mock server', async () => {
    const resp = await EventService.getEvent( events[3].id )
    expect( resp.data ).toEqual( events[3] )
  })

  it('postEvent works - from mock server', async () => {
    const resp = await EventService.postEvent( events[3].id )
    expect( resp ).toEqual( null )
  })
})
