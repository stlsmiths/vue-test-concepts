// https://docs.cypress.io/api/introduction/api.html
import {events} from '../../events-db.json'

const mockEvent = events[1]

describe('EventVerify page ... /event_verify/:id', () => {

    it('visits the /event_verify/:id page', () => {
        cy.visit('/event_verify/' + mockEvent.id ).should('exist')
    })

    it('should exist and renders h1 title properly', () => {
        cy.get('h2')
            .should('exist')
            .should('contain', mockEvent.id )
    })

    it('should have EventCard current and EventCard backend - but no text', () => {
        cy.getBySel('card-current')
            .should('contain', mockEvent.title )
        cy.getBySel('card-backend')
            .should('not.contain', mockEvent.title )
    })

    it('should update backend card after requery click - with API intercepted data', () => {
    const testEvent = { id: 123, title: 'INTERCEPTED test title !!', date: 'Nov 10, 1997', time: '12 noon'}

    cy.intercept(`http://localhost:3000/events/${mockEvent.id}`, {
      delay: 300,
      body: testEvent
    })

    cy.getBySel('button').click()

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', testEvent.title )
    })
})
