/// <reference types="cypress" />

import { SignIn } from './elements/SignIn';

let signIn: SignIn;

describe('SignIn Page', () => {
  beforeEach(() => {
    signIn = new SignIn();
    signIn.visit();
  });

  it('should be able to dispatch toast when has error', () => {
    signIn.submitFormCompleted();
    cy.contains('Erro ao acessar conta. Verifique seu e-mail/senha');
  });

  it('should be be able to render required fileds label', () => {
    signIn.submitFormUncompleted();
    cy.contains('Campo obrigatório');
  });
});
