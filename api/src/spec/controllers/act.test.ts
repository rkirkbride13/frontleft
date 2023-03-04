import Act, { IAct } from "../../models/acts";
import { app } from "../../app";
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";
import Token from "../../models/tokens";

describe("/acts", () => {

  beforeEach(async () => {
    await User.deleteMany({});
    await Act.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Act.deleteMany({});
  });

  describe("Post", () => {
    test("responds with a status code 201 and creates an act", async () => {
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      let token = await Token.jsonwebtoken(user.id);
      let response = await request(app)
        .post("/acts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Elton John",
          stage: "Pyramid",
          date: "2023-06-24",
          start: 2200,
          end: 2330,
        });

      expect(response.status).toEqual(201);
      let acts = await Act.find();
      expect(acts.length).toEqual(1);
      expect(acts[0].name).toEqual("Elton John");
    });
  });

  describe("Get", () => {
    test("responds with a status code 200, and returns all users acts", async () => {
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      let token = await Token.jsonwebtoken(user.id);
      await request(app)
        .post("/acts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Elton John",
          stage: "Pyramid",
          date: "2023-06-24",
          start: 2200,
          end: 2330,
        });

      let response = await request(app)
        .get("/acts")
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(response.statusCode).toEqual(200);
      expect(response.body.acts[0].name).toEqual("Elton John");
    });
  });
});
