import { createTestingPinia } from '@pinia/testing'
import EventVerify from '@/views/EventVerify.vue'
import {events} from '@/../events-db.json'
import router from '@/router'

let mockEvent = events[3]

function mountVerify( event = mockEvent, backendEvent = {}) {
    cy.vmount(EventVerify, {
      props: {
        id: mockEvent.id,
        event,
        backendEvent
      }
/*
  // NOTE:  this is added to the "vmount" command in commands.ts
      global: {
        plugins: [ router, createTestingPinia({createSpy: cy.spy }) ]
      }
*/
    })
}

describe('EventVerify component', () => {

  it('exists and renders', () => {
    mountVerify()
    cy.get('div').should('exist')
  })

  it('accepts the given event prop and renders current and backend cards', () => {
    mountVerify( mockEvent, { id: 12, title: 'test title'} )
    cy.get('div').should('exist')

    cy.getBySel('card-current')
      .should('exist')
      .get('h4')
      .should('contain', mockEvent.title )

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', 'test title' )
  })

  it('accepts the given event prop and renders current and backend cards', () => {
    mountVerify( mockEvent, { id: 12, title: 'test title'} )
    cy.get('div').should('exist')

    cy.getBySel('card-current')
      .should('exist')
      .get('h4')
      .should('contain', mockEvent.title )

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', 'test title' )
  })

  it('responds to Query button click - by making real API call', () => {
    mountVerify( mockEvent )

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', '' )

    const btn = cy.get('button')
    btn.should('exist')
    btn.click()

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', mockEvent.title )
  })

  it('remote api response is mocked', () => {
    const testEvent = { id: 123, title: 'INTERCEPTED test title !!', date: 'Nov 10, 1997', time: '12 noon'}

    mountVerify()

    cy.intercept(`http://localhost:3000/events/${mockEvent.id}`, {
      delay: 300,
      body: testEvent
    })

    cy.getBySel('button').click()

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', testEvent.title )

/*
    also worked with await cy.getBySel('card-backend') ...

    OR
      .then( async (resp) => {
          console.log('cypress vue', Cypress.vue)
          console.log('cypress click resp=', resp)
          // debugger;
          cy.getBySel('card-backend')
            .should('exist')
            .get('h4')
            .should('contain', testEvent.title )
        })
*/
  })

})
