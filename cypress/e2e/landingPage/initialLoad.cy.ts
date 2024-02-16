describe('Initial page load', () => {
  it('Landing page contains header and navigation bar', () => {
    cy.visit('/');
    cy.get('header').should('exist');
    cy.get('nav').should('exist');
  });
});
