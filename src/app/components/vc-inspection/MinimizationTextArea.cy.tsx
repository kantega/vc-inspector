import { useState } from 'react';
import MinimizingTextArea from './MinimizingTextArea';

function WithExternalMinButton() {
  const [state, setState] = useState<'active-button' | 'min' | 'active'>('active');
  return (
    <div className="flex flex-col">
      <MinimizingTextArea
        data-testid="textarea"
        onChange={() => setState('active-button')}
        onMinimizationChange={(m) => setState(m ? 'min' : state === 'active' ? 'active' : 'active-button')}
        requestMinimizationTo={state === 'min'}
      />
      <button
        data-testid="min-button"
        className={`m-2 min-w-min self-center rounded-l border-2 bg-blue-100 p-2 ${state != 'active-button' && 'hidden'}`}
        onClick={() => setState('min')}
      >
        Click to minimize!
      </button>
    </div>
  );
}

function button() {
  return cy.get('[data-testid="min-button"]');
}

function textarea() {
  return cy.get('[data-testid="textarea"]');
}

describe('<MinimizingTextArea /> with button to minimize', () => {
  it('Writing to component shows a minimization button to click', () => {
    cy.mount(<WithExternalMinButton />);

    button().should('not.be.visible');

    textarea().should('exist').type('More text');

    button().should('be.visible').click().should('not.be.visible');
  });
  it('Pasting text does not show button', () => {
    cy.mount(<WithExternalMinButton />);
    button().should('not.be.visible');
    textarea().trigger('paste');
    button().should('not.be.visible');
  });
});
