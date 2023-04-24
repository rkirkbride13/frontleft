import Act, { IAct } from "../../models/acts";
import mongoose from "mongoose";
import "../mongodb_helper";

describe("Act", () => {
  let act: IAct;
  beforeEach(async () => {
    // Drop the "acts" collection from the database before each test case and create a new act
    await mongoose.connection.collections.acts.drop();
    act = await Act.create({
      name: "Elton John",
      stage: "Pyramid",
      date: "2023-06-24",
      start: 2200,
      end: 2330,
      user_id: "640336eb9e363bc491c41921",
    });
  });

  it("should create an act", () => {
    // Test that the act has the correct properties
    expect(act.name).toEqual("Elton John");
    expect(act.stage).toEqual("Pyramid");
    expect(act.date).toEqual(new Date("2023-06-24"));
    expect(act.start).toEqual(2200);
    expect(act.end).toEqual(2330);
    expect(act.user_id).toEqual("640336eb9e363bc491c41921");
  });

  it("acts are saved to the database and can be accessed", async () => {
    // Retrieve all acts from the database
    const acts = await Act.find();
    // Test that the number of retrieved acts is correct
    expect(acts.length).toEqual(1);
    // Test that the retrieved act has the correct properties
    expect(acts[0].name).toEqual("Elton John");
  });
});
