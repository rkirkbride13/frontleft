import Act from "./act";

const act = {
  name: "Robbie",
  stage: "Git staging",
  date: new Date(),
  start: 1800,
  end: 1900,
  user_id: "123xyz",
};

describe("Act", () => {
  it("renders with an act", () => {
    cy.mount(<Act act={act} />);

    cy.get('[data-cy="act"]')
      .should("contain.text", "Robbie")
      .and("contain.text", "1800")
      .and("contain.text", "1900");
  });
});
