
describe('Events API test', () => {
  it("Mock Service Worker ?? ... API tests", function () {
    cy.server()
    cy.route('GET', '/digits', [ 1,2,3 ]).as('todosList');
/*
    cy.request("GET", `${apiLikes}/${ctx.transactionId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.likes.length).to.eq(1);
    })
*/
    cy.visit('/digits');

    cy.wait('@todosList')
      .should('exist')
      .should('have.length', 3)

  })
})
