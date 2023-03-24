describe("Siging in", () => {
  before(() => {
    cy.signup("new_user", "newuser100@email.com", "12345678");
  });

  it("with valid credentials, redirects to '/acts'", () => {
    cy.visit("/");
    cy.get('[data-cy="email"]').type("newuser100@email.com");
    cy.get('[data-cy="password"]').type("12345678");
    cy.get('[data-cy="signin-submit"]').click();

    cy.url().should("include", "/acts");
  });

  describe("with incorrect user details it does not redirect", () => {
    it("has incorrect password", () => {
      cy.visit("/");
      cy.get('[data-cy="email"]').type("newuser100@email.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="signin-submit"]').click();

      cy.url().should("include", "/");
      cy.url().should("not.include", "/acts");
    });

    it("has incorrect email", () => {
      cy.visit("/");
      cy.get('[data-cy="email"]').type("user100@email.com");
      cy.get('[data-cy="password"]').type("12345678");
      cy.get('[data-cy="signin-submit"]').click();

      cy.url().should("include", "/");
      cy.url().should("not.include", "/acts");
    });
  });
});
