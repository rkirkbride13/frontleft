import Act, { IAct } from "../../models/acts";
import mongoose from "mongoose";
import "../mongodb_helper";
// import 'jest';
// import { DropCollectionOptions } from 'mongodb';

describe("Act", () => {
  let act: IAct;
  beforeEach(async () => {
    await mongoose.connection.collections.acts.drop();
    act = await Act.create({
      name: "Elton John",
      stage: "Pyramid",
      date: "2023-06-24",
      start: 2200,
      end: 2330,
    });
  });

  it("should create an act", () => {
    expect(act.name).toEqual("Elton John");
    expect(act.stage).toEqual("Pyramid");
    expect(act.date).toEqual(new Date("2023-06-24"));
    expect(act.start).toEqual(2200);
    expect(act.end).toEqual(2330);
  });

  it("acts are saved to the database and can be accessed", async () => {
    const acts = await Act.find();
    expect(acts.length).toEqual(1);
    expect(acts[0].name).toEqual("Elton John");
  });
});
