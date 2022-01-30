/// <reference types="cypress" />

export class Activities {
  visit() {
    cy.authentication(`/dashboard`);
  }

  submitFormCompleted() {
    cy.get('select').select('bike');
    cy.get('input[placeholder="Tempo"]').type('10:00');
    cy.get('input[placeholder="Data"]').type('12/12/2022');
    cy.get('form').submit();
  }

  submitFormUncompleted() {
    cy.get('form').submit();
  }
}
