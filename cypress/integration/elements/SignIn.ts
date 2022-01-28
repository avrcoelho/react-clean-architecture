/// <reference types="cypress" />

export class SignIn {
  visit(url = '') {
    cy.visit(`/${url}`);
  }

  submitFormCompleted() {
    cy.get('input[placeholder="E-mail"]').type('user@test.com');
    cy.get('input[placeholder="Senha"]').type('1234567');
    cy.get('form').submit();
  }

  submitFormUncompleted() {
    cy.get('form').submit();
  }
}
