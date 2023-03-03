import { app } from '../../app'
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";
 
describe("/tokens", () => {
  beforeAll(async () => {
    await User.deleteMany({})
    await User.create({
      name: "Robbie",
      email: "test@email.com",
      password: "$2a$10$N/6whL0ERCoXPEeYbYVXPOj//aewYhYcbNbKVIlF8gCYBtA3GWrFu",
      // password: "password1",
    });
  })

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("returns a token when credentials are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@email.com", password: "password1" });
    expect(response.body.message).toEqual("OK");
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
  })

  xit("does NOT return a token when password is invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@email.com", password: "1password" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error - passwords do not match");
  })

  xit("does NOT return a token when email is invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "eibbor@email.com", password: "password1" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error - user does not exist");
  })
})