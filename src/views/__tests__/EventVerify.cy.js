import EventVerify from '../EventVerify.vue'
import {events} from '../../../events-db.json'

// Great ... XHR testing
// https://github.com/JessicaSachs/cy-component-interview/blob/master/src/components/xhr/ajax-list-spec.js
//  first setup a server mocking
//  ... prior to mounting

let mockEvent = events[3]

function mountVerify( event = mockEvent, backendEvent = {}) {
    cy.mount(EventVerify, {
      props: {
        id: mockEvent.id,
        event,
        backendEvent
      }
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
    // console.log('pinia', Cypress.vue.$pinia)
    // debugger;

    const testEvent = { id: 123, title: 'test title', date: 'Nov 10, 1997', time: '12 noon'}

    cy.viewport(1200,1200)
    cy.intercept('http://localhost:3000/event/' + mockEvent.id, {
      delay: 300,
      body: testEvent
    })
    mountVerify()

    cy.get('@mockResp').should('exist')

    cy.getBySel('card-backend')
      .should('exist')
      .get('h4')
      .should('contain', testEvent.title )


  })

  it.skip('', () => {
    // from
    //  https://github.com/JessicaSachs/cy-component-interview/blob/master/src/components/xhr/ajax-list-spec.js
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/event/123',
      response: mockEvent,
      delay: 1000
    }).as('event')
    cy.mount(EventVerify)

    cy.wait('@event').its('response.body').should('have.attr', 'id')
  })

})
