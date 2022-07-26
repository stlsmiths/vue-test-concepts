import { mount } from 'cypress/vue'
import MyInput from '../MyInput.vue'

const tstr = (str) => `[data-testid="${str}"]`

const labelSelector = tstr('label')
const slenSelector = tstr('slen')
const contSelector = tstr('container')
const inputSelector = tstr('input')

describe('MyInput.cy.ts', () => {
  let mockInput = 'Cypress Testing !!'

  it('playground', () => {
    cy.mount(MyInput, { props: {modelValue: mockInput}})
    cy.get(contSelector).should('exist')
  })
  it('should default label', () => {
    // Arrange
    cy.mount(MyInput,{ props: {modelValue: mockInput}})
    // Assert
    cy.get(labelSelector).should('have.text', 'My Label')
  })

  it('should calculate computed slen', () => {
    // Arrange
    cy.mount(MyInput,{ props: {modelValue: mockInput}})
    // Assert
    cy.get(slenSelector).should('contain.text', '8' )
  })

  it('should change text properly', () => {
    const onUpdateSpy = cy.spy().as('onUpdateSpy')
    cy.mount(MyInput,{ props: {
          modelValue: mockInput,
          onUpdate: onUpdateSpy
        }
    }).as('vueWrapper')

    // Act
    const ntext = 'test1234567'
    // cy.get(inputSelector).should('have.value', mockInput.substring(0,8) )
    cy.getBySel('input').should('have.value', mockInput.substring(0,8) )

    cy.getBySel('input')
      .clear()
      .type('test123')
      .type('{enter}')
      .should('have.value', 'test123')

    // Assert
    cy.get('@onUpdateSpy').should('have.been.calledWith', 'test123')

    // See https://github.com/JessicaSachs/vue-3-cypress-vite/blob/master/src/components/HelloWorld.spec.jsx
    cy.get('@vueWrapper')
        .should( wrapper => {
          // make sure chrome dev / pause on debug is enabled
          //  wrapper has .componentVM with all props, or just as .vm
          //  wrapper.emitted has events emitted
          // debugger;
          console.log('wrapper', wrapper )
          expect( wrapper.emitted('update') ).to.have.length(8)
          expect( wrapper.emitted('update:model-value') ).to.have.length(8)
        })

/*
    cy.getBySel('input')
        .vue()
        .then( wrapper => {
          debugger
        })
*/


  })

})
