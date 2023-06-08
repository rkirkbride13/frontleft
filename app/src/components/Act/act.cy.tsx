import Act from "./act";

// Define a mock act object to use in tests
const act: any = {
  name: "Robbie",
  stage: "Git staging",
  date: new Date(),
  start: 1800,
  end: 1900,
  user_id: "123xyz",
};

describe("Act", () => {
  it("renders with an act and delete button", () => {
    // Define a mock function to pass as a prop
    let setActsMock = cy.stub();
    // Mount the component with the mock props
    cy.mount(<Act act={act} token={"tokenMock"} setActs={setActsMock} />);
    // Check that the act information is rendered correctly
    cy.get('[data-cy="act"]').should("contain.text", "Robbie: 1800-1900");
    // Check that the delete button is rendered correctly
    cy.get('[data-cy="delete-button"]')
      .invoke("attr", "type")
      .should("eq", "submit");
  });

  it("sends a DELETE request and can delete an act", () => {
    // Define a mock function to pass as a prop
    let setActsMock = cy.stub();
    // Mount the component with the mock props
    cy.mount(<Act act={act} token={"tokenMock"} setActs={setActsMock} />);
    // Intercept the DELETE request to the server and mock a successful response
    cy.intercept("DELETE", "acts", { message: "DELETED" }).as("deleteAct");
    // Click the delete button and wait for the intercept to complete
    cy.get('[data-cy="delete-button"]').click();
    cy.wait("@deleteAct").then((interception) => {
      expect(interception.response!.body.message).to.eq("DELETED");
    });
  });
});
