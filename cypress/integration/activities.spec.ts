/// <reference types="cypress" />
import { Activities } from './elements/Activities';

let activities: Activities;

describe('Activities Page', () => {
  beforeEach(() => {
    activities = new Activities();
    activities.visit();
  });

  it('should be able to dispatch toast when has error on get activities', () => {
    cy.contains('Erro ao obter as atividades');
  });

  it('should be able to dispatch toast when has error', () => {
    activities.submitFormCompleted();
    cy.contains('Erro ao adicionar atividade');
  });

  it('should be be able to render required fileds label', () => {
    activities.submitFormUncompleted();
    cy.contains('Campo obrigatório');
  });

  it('should be be able to render activities list', () => {
    cy.intercept('GET', '/activities', {
      statusCode: 201,
      body: {
        id: 'test-id',
        time: '07:07',
        type: 'bick',
        date: new Date().toISOString(),
      },
    }).as('activities');
    cy.get('article').should('have.length', 2);
  });

  it('should be be able to show success toast', () => {
    cy.intercept('POST', '/activities', {
      statusCode: 201,
      body: {},
    }).as('activities');
    activities.submitFormCompleted();
    cy.contains('Atividade adicionada');
  });

  it('should be be able to show error on delete activity', () => {
    cy.intercept('DELETE', '/activities/12', {
      statusCode: 404,
      body: {},
    }).as('activities');
    cy.get('button').contains('Excluir').first().click();
    cy.contains('Erro ao excluir atividade');
  });

  it('should be be able to show success on delete activity', () => {
    cy.intercept('DELETE', '/activities/12', {
      statusCode: 201,
      body: {},
    }).as('activities');
    cy.get('button').contains('Excluir').first().click();
    cy.contains('Atividade excluída');
  });
});
