import React from 'react';
import Page from './page';

describe('<Home />', () => {
  it('renders', () => {
    cy.mount(<Page />);
  });
});
