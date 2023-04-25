import ActForm from "./ActForm";

const navigate = () => {};

describe("Act Form", () => {
  it("sends a request when the form is submitted", () => {
    // Define a mock function to pass as a prop
    let setActsMock = cy.stub();
    // Mount the component with the mock props
    cy.mount(
      <ActForm navigate={navigate} token={"tokenMock"} setActs={setActsMock} />
    );
    // Intercept the POST request to /acts and respond with a message of "OK"
    cy.intercept("POST", "/acts", { message: "OK" }).as("saveAct");
    // Fill in the form fields and submit the form
    cy.get('[data-cy="name"]').type("Robbie");
    cy.get('[data-cy="stage"]').type("Git");
    cy.get('[data-cy="date"]').type("2023-03-23T18:00");
    cy.get('[data-cy="start"]').type("1800");
    cy.get('[data-cy="end"]').type("1900");
    cy.get('[data-cy="submit-act"]').click();
    // Wait for the intercepted request to complete and check the response message
    cy.wait("@saveAct").then((interception) => {
      expect(interception.response!.body.message).to.eq("OK");
    });
  });
});
