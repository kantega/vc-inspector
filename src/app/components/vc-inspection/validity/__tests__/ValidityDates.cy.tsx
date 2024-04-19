import ValidityDates from '@/components/vc-inspection/validity/ValidityDates';

function dateFrom() {
  return cy.get('[data-testid="valid-from-date"]');
}
function dateUntil() {
  return cy.get('[data-testid="valid-until-date"]');
}

const CONTAINS_NO_DIGIT = /^((?!\d).)*$/;

describe('<ValidityDates />', () => {
  it('starts as open', () => {
    cy.mount(
      <ValidityDates
        withinDates
        validFrom={{ kind: 'none', reason: 'Test validFrom reason' }}
        validUntil={{ kind: 'none', reason: 'Test validUntil reason' }}
      />,
    ).should('exist');
    dateFrom().should('be.visible');
    dateUntil().should('be.visible');
  });
  it('closes on click', () => {
    cy.mount(
      <ValidityDates
        withinDates
        validFrom={{ kind: 'none', reason: 'Test validFrom reason' }}
        validUntil={{ kind: 'none', reason: 'Test validUntil reason' }}
      />,
    ).should('exist');
    dateFrom().should('be.visible');
    dateUntil().should('be.visible');
    cy.get('button').click({ multiple: true });
    dateFrom().should('not.be.visible');
    dateUntil().should('not.be.visible');
  });
  it('has no numbers for date when not passed in', () => {
    cy.mount(
      <ValidityDates
        withinDates
        validFrom={{ kind: 'none', reason: 'Test validFrom reason' }}
        validUntil={{ kind: 'none', reason: 'Test validUntil reason' }}
      />,
    ).should('exist');
    dateFrom().should('be.visible').contains(CONTAINS_NO_DIGIT);
    dateUntil().should('be.visible').contains(CONTAINS_NO_DIGIT);
  });
  it('from has numbers when passed a date to from', () => {
    cy.mount(
      <ValidityDates
        withinDates
        validFrom={{ kind: 'some', value: new Date() }}
        validUntil={{ kind: 'none', reason: 'Test validUntil reason' }}
      />,
    ).should('exist');
    dateFrom().should('be.visible').contains(/\d/);
    dateUntil().should('be.visible').contains(CONTAINS_NO_DIGIT);
  });
});
