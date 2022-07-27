import EventCard from '../EventCard.vue'
import {events} from '../../../events-db.json'


describe('EventCard', () => {
    let mockEvent = events[0]

    beforeEach( () => {
        cy.mount(EventCard, { props: { event: mockEvent } })
    })

    it('playground', () => {
        cy.get('.my-totally-made-up-class').should('not.exist')
    })

    it('should exist and render', () => {
        // cy.mount(EventCard, { props: { event: mockEvent } })
        cy.getBySel('event-card').should('exist')
    })

    it('should have heading span with date / time', () => {
        cy.getBySel('event-card')
          .get('span')
          .should('contain', mockEvent.date)
          .should('contain', mockEvent.time)
    })

    it('should have correct h4 with title', () => {
        cy.getBySel('event-card')
            .get('h4')
            .should('have.text', mockEvent.title )
    })
})
