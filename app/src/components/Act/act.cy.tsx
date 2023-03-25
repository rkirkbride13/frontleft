import Act from "./act";
import { IAct } from "../../../../api/src/models/acts";

const act: IAct | any= {
  name: "Robbie",
  stage: "Git staging",
  date: new Date(),
  start: 1800,
  end: 1900,
  user_id: "123xyz",
};

describe("Act", () => {
  it("renders with an act", () => {
    let setActsMock = cy.stub();
    cy.mount(<Act act={act} token={"tokenMock"} setActs={setActsMock}/>);
    cy.get('[data-cy="act"]').should("contain.text", "Robbie - 1800 to 1900");
  });
});
