describe("Saving an act", () => {
  before(() => {
    cy.signup("user_save", "user_save@email.com", "12345678");
    cy.signin("user_save@email.com", "12345678");
  });

  it("saves an act and renders it on the page", () => {
    cy.visit("/acts");
    cy.get('[data-cy="name"]').type("Save test");
    cy.get('[data-cy="stage"]').type("Git");
    cy.get('[data-cy="date"]').type("2023-06-24");
    cy.get('[data-cy="start"]').type("1800");
    cy.get('[data-cy="end"]').type("1900");
    cy.get('[data-cy="submit-act"]').click();

    cy.get('[data-cy="acts"]').should("contain.text", "Save test: 1800-1900");
  });
});
