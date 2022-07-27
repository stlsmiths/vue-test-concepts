import {createTestingPinia} from "@pinia/testing";
import { setActivePinia, createPinia } from 'pinia'

import EventList from '../EventList.vue'
import {events} from '@/../events-db.json'
import router from '@/router'

let mockEvents = events

const testPinia = createTestingPinia({
  initialState: {
    events: { events }
  },
  stubActions: true,
  createSpy: cy.spy
})

describe('EventList', () => {

    beforeEach( () => {
        cy.mount(EventList, {
          // components: { EventCard },
          global: {
            plugins: [ testPinia, router ]
          }
        })
        setActivePinia( createPinia() )
    })

    it('should exist and render', () => {
        cy.getBySel('event-list-title').should('exist')
    })

  it( 'has listing of events', () => {
    cy.get('.event-link')
      .should('have.length', 9)
  })

  it( 'has first event card with proper text and href', () => {
    const first = cy.get('.event-link')
      .first()
    first.should('contain', mockEvents[0].title)
    first.should('have.attr','href')
        .should('contain','/event/' + mockEvents[0].id)
  })

  it( 'has last event card with proper text and href', () => {
    const last = cy.get('.event-link').last()
    const lastIndex = mockEvents.length -1
    last.should('contain', mockEvents[lastIndex].title)
    last.should('have.attr','href')
      .should('contain','/event/' + mockEvents[lastIndex].id)

  })
})
