import ActForm from "./ActForm";

const navigate = () => {};

describe("Act Form", () => {
  it("sends a request when the form is submitted", () => {
    let setActsMock = cy.stub();
    cy.mount(
      <ActForm navigate={navigate} token={"tokenMock"} setActs={setActsMock} />
    );

    cy.intercept("POST", "/acts", { message: "OK" }).as("saveAct");

    cy.get('[data-cy="name"]').type("Robbie");
    cy.get('[data-cy="stage"]').type("Git");
    cy.get('[data-cy="date"]').type("2023-03-23T18:00");
    cy.get('[data-cy="start"]').type("1800");
    cy.get('[data-cy="end"]').type("1900");
    cy.get('[data-cy="submit-act"]').click();

    cy.wait("@saveAct").then((interception) => {
      expect(interception.response!.body.message).to.eq("OK");
    });
  });
});
