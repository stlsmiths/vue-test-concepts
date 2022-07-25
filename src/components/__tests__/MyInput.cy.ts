import MyInput from '../MyInput.vue'
import {kStringMaxLength} from "buffer";
// import {beforeEach} from "vitest";

const tstr = (str: string ): string => `[data-testid="${str}"]`

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
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(MyInput,{ props: {
          modelValue: mockInput,
          onUpdateModelValue: onChangeSpy
        }
      })
    // Act
    const ntext = 'test1234567'
    cy.get(inputSelector).should('have.value', mockInput.substring(0,8))
    cy.get(inputSelector).invoke('val',ntext)
    // cy.get('input').type('test123')

    cy.get(inputSelector).should('have.value', 'test1234')

    // cy.contains( 'test123' )

    // console.log('input =', cy.get(inputSelector) )
    // Assert
    // cy.get('@onChangeSpy').should('have.been.calledWith', 'test123')
  })

})
