import { app } from "../../app";
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";

describe("/tokens", () => {
  beforeAll(async () => {
    // Delete all existing users from the database
    await User.deleteMany({});
    // Create a new user
    await request(app).post("/users").send({
      name: "Robbie",
      email: "robbie@email.com",
      password: "password1",
    });
  });

  afterAll(async () => {
    // Delete all existing users from the database after the tests
    await User.deleteMany({});
  });

  it("returns a token when credentials are valid", async () => {
    // Send a POST request to the "/tokens" endpoint with valid data
    let response = await request(app)
      .post("/tokens")
      .send({ email: "robbie@email.com", password: "password1" });
    // Expect an OK message, a status code of 200 and the request body to have a token
    expect(response.body.message).toEqual("OK");
    expect(response.status).toEqual(200);
    expect(response.body.token).not.toEqual(undefined);
  });

  it("does NOT return a token when password is invalid", async () => {
    // Send a POST request to the "/tokens" endpoint with invalid password data
    let response = await request(app)
      .post("/tokens")
      .send({ email: "robbie@email.com", password: "1password" });
    // Expect a status code of 401 and the request body to not have a token
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual(
      "auth error - passwords do not match"
    );
  });

  it("does NOT return a token when email is invalid", async () => {
    // Send a POST request to the "/tokens" endpoint with invalid email data
    let response = await request(app)
      .post("/tokens")
      .send({ email: "eibbor@email.com", password: "password1" });
    // Expect a status code of 401 and the request body to not have a token
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error - user does not exist");
  });
});
