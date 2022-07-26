// https://docs.cypress.io/api/introduction/api.html
import {events} from '../../events-db.json'

const mockEvent = events[1]

describe('EventDetails page ... /event/:id', () => {

    it('visits the /event/:id page', () => {
        cy.visit('/event/' + mockEvent.id ).should('exist')
    })
    it('should exist and renders h1 title properly', () => {
        cy.get('h1')
            .should('exist')
            .should('have.text', mockEvent.title )
    })

    it('should have heading with date / time', () => {
        cy.getBySel('header')
            .should('contain', mockEvent.date )
            .should('contain', mockEvent.time )
            .should('contain', mockEvent.location )
    })

    it('should have correct h4 with title', () => {
        cy.getBySel('details')
            .should('have.text', mockEvent.description )
    })
})
