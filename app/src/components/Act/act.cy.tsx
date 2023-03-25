import Act from "./act";
import { IAct } from "../../../../api/src/models/acts";

const act: IAct | any = {
  name: "Robbie",
  stage: "Git staging",
  date: new Date(),
  start: 1800,
  end: 1900,
  user_id: "123xyz",
};

describe("Act", () => {
  it("renders with an act and delete button", () => {
    let setActsMock = cy.stub();

    cy.mount(<Act act={act} token={"tokenMock"} setActs={setActsMock} />);

    cy.get('[data-cy="act"]').should("contain.text", "Robbie - 1800 to 1900");
    cy.get('[data-cy="delete-button"]')
      .invoke("attr", "type")
      .should("eq", "submit");
  });

  it("sends a DELETE request and can delete an act", () => {
    let setActsMock = cy.stub();

    cy.mount(<Act act={act} token={"tokenMock"} setActs={setActsMock} />);
    cy.intercept("DELETE", "acts", { message: "DELETED" }).as("deleteAct");

    cy.get('[data-cy="delete-button"]').click();
    cy.wait("@deleteAct").then((interception) => {
      expect(interception.response!.body.message).to.eq("DELETED");
    });
  });
});
