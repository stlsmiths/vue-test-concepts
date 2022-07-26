import MyInput from '../MyInput.vue'

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
    const onUpdateSpy = cy.spy().as('onUpdateSpy')
    cy.mount(MyInput,{ props: {
          modelValue: mockInput,
          onUpdate: onUpdateSpy
        }
      })

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

  })

})
