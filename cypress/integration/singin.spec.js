/// <reference types="cypress" />

describe('SignIn Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be able to dispatch toast when has error', () => {
    cy.get('input[placeholder="E-mail"]').type('user@test.com');
    cy.get('input[placeholder="Senha"]').type('1234567');
    cy.get('form').submit();
    cy.contains('Erro ao acessar conta. Verifique seu e-mail/senha');
  });
});
