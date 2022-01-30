/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
import CacheKeys from '../../src/shared/presentation/constants/cacheKeys';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      authentication(url: string): void;
    }
  }
}

Cypress.Commands.add('authentication', (url: string) => {
  window.localStorage.setItem(
    CacheKeys.UserData,
    JSON.stringify({
      id: 'test-id',
      token: 'token-id',
      fullname: 'John DOe',
    }),
  );
  cy.visit(url);
});
