import { app } from "../../app";
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";
import bcrypt from "bcrypt";
import sendWelcomeEmail from "../../emails/account";

jest.mock("../../emails/account", () => jest.fn());

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("post when email and password are provided", () => {
    it("gives response code 201 and creates a user", async () => {
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password",
      });
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
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);

      let users = await User.find();
      let newUser = users[users.length - 1];
      bcrypt
        .compare("password", newUser.password)
        .then((res) => expect(res).toBe(true));
    });
  });

  describe("post when name not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "robbie@email.com", password: "password1" });
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      let response = await request(app)
        .post("/users")
        .send({ name: "Robbie", password: "password1" });
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when password not provided", () => {
    it("gives response code 400 and does NOT create user", async () => {
      let response = await request(app)
        .post("/users")
        .send({ name: "Robbie", email: "robbie@email.com" });
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email is invalid", () => {
    it("gives response code 400 and does NOT create user", async () => {
      let response = await request(app).post("/users").send({
        name: "Robbie",
        email: "robbieemail.com",
        password: "password1",
      });
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("post when email exists in DB", () => {
    it("gives response code 400 and does NOT create user", async () => {
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
      expect(response.statusCode).toBe(400);
      let users = await User.find();
      expect(users.length).toEqual(1);
    });
  });
});
