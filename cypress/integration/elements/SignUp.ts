/// <reference types="cypress" />

export class SignUp {
  visit(url = 'signup') {
    cy.visit(`/${url}`);
  }

  submitFormCompleted() {
    cy.get('input[placeholder="Nome completo"]').type('John Doe');
    cy.get('input[placeholder="E-mail"]').type('user@test.com');
    cy.get('input[placeholder="Senha"]').type('1234567');
    cy.get('input[placeholder="Confirmar senha"]').type('1234567');
    cy.get('form').submit();
  }

  submitFormPasswordNotEqual() {
    cy.get('input[placeholder="Nome completo"]').type('John Doe');
    cy.get('input[placeholder="E-mail"]').type('user@test.com');
    cy.get('input[placeholder="Senha"]').type('1234567');
    cy.get('input[placeholder="Confirmar senha"]').type('12345');
    cy.get('form').submit();
  }

  submitFormUncompleted() {
    cy.get('form').submit();
  }
}
