/// <reference types="cypress" />
import { SignUp } from './elements/SignUp';

let signUp: SignUp;

describe('SignUp Page', () => {
  beforeEach(() => {
    signUp = new SignUp();
    signUp.visit();
  });

  it('should be able to dispatch toast when has error', () => {
    signUp.submitFormCompleted();
    cy.contains('Erro ao realizar o cadastro. Tente novamente mais tarde');
  });

  it('should be be able to render required fileds label', () => {
    signUp.submitFormUncompleted();
    cy.contains('Campo obrigatório');
  });

  it('should be be able to redirect after success login', () => {
    cy.intercept('POST', '/users', {
      statusCode: 409,
    }).as('signUp');
    signUp.submitFormCompleted();
    cy.contains('E-mail já cadastrado');
  });

  it('should be be able to show success toast', () => {
    cy.intercept('POST', '/users', {
      statusCode: 200,
      body: {},
    }).as('signUp');
    signUp.submitFormCompleted();
    cy.contains('Cadastro realizado com sucesso');
  });
});
