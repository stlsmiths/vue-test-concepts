import EventList from '../EventList.vue'
import EventCard from '../EventCard.vue'
import {events} from '../../../events-db.json'

import {createTestingPinia} from "@pinia/testing";
import { setActivePinia, createPinia } from 'pinia'
import { f } from 'cypress'
import {useEvents} from '../../stores/events-store'
import router from "../../router";
// import {vi} from "vitest/dist";

const testPinia = createTestingPinia({
  initialState: {
    events: { events }
  },
  createSpy: f
})

describe('EventList', () => {
    let mockEvents = events

    beforeEach( () => {
        cy.mount(EventList, {
          // components: { EventCard },
          global: {
            plugins: [ testPinia ]
          }
        })
        setActivePinia( createPinia() )
    })

    it('should exist and render', () => {
        // cy.mount(EventCard, { props: { event: mockEvent } })
        cy.getBySel('event-list-title').should('exist')
    })

  it( 'has listing of events', () => {
    cy.get('.event-link')
      .should('have.length', 9)
  })
  it( 'has event card with proper text and href', () => {
    const first = cy.get('.event-link')
      .first()
    first.should('contain', events[0].title)
    first.should('have.attr','href', '/event/' + events[0].id)
  })


/*
    it('should have heading span with date / time', () => {
        cy.getBySel('event-card')
            .get('span')
            .should('have.text', '@12:00 on January 28, 2022')
            .should('have.text', '@12:00 on January 28, 2022')
    })

    it('should have correct h4 with title', () => {
        cy.getBySel('event-card')
            .get('h4')
            .should('have.text', 'Cat Adoption Day')
    })
*/
})
