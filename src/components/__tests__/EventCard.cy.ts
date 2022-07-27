import EventCard from '@/components/EventCard.vue'
import {events} from '@/../events-db.json'

let mockEvent = events[0]

function mountCard(opts = {}) {
    const props = { event: mockEvent, verify: true, ...opts.props }
    cy.mount(EventCard, { props } )
}

describe('EventCard', () => {

    describe('basic tests', () => {

        beforeEach( () => {
            // cy.mount(EventCard, { props: { event: mockEvent, verify: true } })
            mountCard()
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

        it('should show verify link', () => {
            const link = cy.getBySel('verify-link')
            link.should('exist')
            link.should('have.attr','to')
                .should('contain','/event_verify' )
        })

    })

    it('works with verify off', () => {
        mountCard({ props: { verify: false }})

        cy.getBySel('event-card')
            .get('h4')
            .should('have.text', mockEvent.title )

        const link = cy.getBySel('verify-link')
        link.should('not.exist')
    })
})
