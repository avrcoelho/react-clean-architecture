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

  it('should be be able to redirect after success login', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 201,
      body: {
        id: 'test-id',
        token: 'token-id',
        fullname: 'John DOe',
      },
    }).as('signIn');
    signIn.submitFormCompleted();
    signIn.visit('dashboard');
    cy.contains('Atividades');
  });

  it('should be be able to return error on login', () => {
    cy.intercept('POST', '/auth/login', {
      statusCode: 404,
    }).as('signIn');
    signIn.submitFormCompleted();
    cy.contains('Erro ao acessar conta. Verifique seu e-mail/senha');
  });
});
