import EventCard from '../EventCard.vue'
import {events} from '../../../events-db.json'


describe('EventCard', () => {
    let mockEvent = events[0]

    beforeEach( () => {
        cy.mount(EventCard, { props: { event: mockEvent } })
    })

    it('should exist and render', () => {
        // cy.mount(EventCard, { props: { event: mockEvent } })
        cy.getBySel('event-card').should('exist')
    })

    it('should have heading span with date / time', () => {
        cy.getBySel('event-card')
            .get('span')
            .should('have.text', '@12:00 on January 28, 2022')
    })

    it('should have correct h4 with title', () => {
        cy.getBySel('event-card')
            .get('h4')
            .should('have.text', 'Cat Adoption Day')
    })
})