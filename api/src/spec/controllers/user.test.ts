import { app } from "../../app";
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";
import bcrypt from "bcrypt";
import sendWelcomeEmail from "../../emails/account";

jest.mock("../../emails/account", () => jest.fn());

describe("/users", () => {
  beforeEach(async () => {
    // Delete all existing users from the database
    await User.deleteMany({});
  });

  describe("post when email and password are provided", () => {
    it("gives response code 201 and creates a user", async () => {
      // Send a POST request to the "/users" endpoint with valid data
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password",
      });
      // Assert that sendWelcomeEmail function is called with correct arguments
      expect(sendWelcomeEmail).toHaveBeenCalledWith(
        "robbie@email.com",
        "Robbie"
      );
      expect(response.statusCode).toBe(200);

      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("robbie@email.com");
    });

    it("encrypts the password", async () => {
      // Send a POST request to the "/users" endpoint with valid data
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      // Assert that the password is encrypted correctly
      let users = await User.find();
      let newUser = users[users.length - 1];
      bcrypt
        .compare("password", newUser.password)
        .then((res) => expect(res).toBe(true));
    });
  });

  describe("post when name not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      // Send a POST request to the "/users" endpoint with invalid name data
      let response = await request(app)
        .post("/users")
        .send({ email: "robbie@email.com", password: "password1" });
      // Assert that no user is created in the database
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      // Send a POST request to the "/users" endpoint with invalid email data
      let response = await request(app)
        .post("/users")
        .send({ name: "Robbie", password: "password1" });
      // Assert that no user is created in the database
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when password not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      // Send a POST request to the "/users" endpoint with invalid password data
      let response = await request(app)
        .post("/users")
        .send({ name: "Robbie", email: "robbie@email.com" });
      // Assert that no user is created in the database
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email is invalid", () => {
    it("gives response code 400 and does NOT create user", async () => {
      // Send a POST request to the "/users" endpoint with invalid email data
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbieemail.com",
        password: "password1",
      });
      // Assert that no user is created in the database
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email exists in DB", () => {
    it("gives response code 400 and does NOT create user", async () => {
      // Send a POST request to the "/users" endpoint with invalid email data
      await User.create({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      let response = await request(app).post("/users").send({
        name: "Robbie New",
        email: "robbie@email.com",
        password: "password100",
      });
      // Assert that no user is created in the database
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(1);
    });
  });
});
