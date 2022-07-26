// https://docs.cypress.io/api/introduction/api.html
import {events} from '../../events-db.json'

describe('/events page', () => {
/*
    beforeEach( () => {
        cy.visit('/events')
    })
*/

    it('visits the /events page', () => {
        cy.visit('/events')
        cy.getBySel('event-list-title')
            .should('contain','Events for Good')
    })
    it( 'has proper page heading', () => {
        // cy.visit('/events')
        cy.get('h2')
            .should('have.class','blue')
            .should('contain','Events - Testing Demo')

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
})
