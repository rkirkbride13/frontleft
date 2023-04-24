import Act from "../../models/acts";
import { app } from "../../app";
import request from "supertest";
import "../mongodb_helper";
import User from "../../models/users";
import Token from "../../models/tokens";

describe("/acts", () => {
  // Clear the database of all users and acts before each test
  beforeEach(async () => {
    await User.deleteMany({});
    await Act.deleteMany({});
  });
  // Clear the database of all users and acts after the tests
  afterAll(async () => {
    await User.deleteMany({});
    await Act.deleteMany({});
  });

  describe("Post", () => {
    test("responds with a status code 201 and creates an act", async () => {
      // Create a new user and save it to the database
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      // Create a JSON Web Token for the user and save it
      let token = await Token.jsonwebtoken(user.id);
      // Send a POST request to the "/acts" endpoint with valid data and the JWT as an authorization header
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

      expect(response.status).toEqual(200);
      let acts = await Act.find();
      expect(acts.length).toEqual(1);
      expect(acts[0].name).toEqual("Elton John");
    });

    test("responds with a status code 400 if act not created", async () => {
      // Create a new user and save it to the database
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      // Create a JSON Web Token for the user and save it
      let token = await Token.jsonwebtoken(user.id);
      // Send a POST request to the "/acts" endpoint with invalid data and the JWT as an authorization header
      let response = await request(app)
        .post("/acts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          stage: "Pyramid",
          date: "2023-06-24",
          start: 2200,
          end: 2330,
        });

      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual("Act not created");
      let acts = await Act.find();
      expect(acts.length).toEqual(0);
    });
  });

  describe("Get", () => {
    test("responds with a status code 200, and returns all users acts", async () => {
      // Create a new user and save it to the database

      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      // Create a JSON Web Token for the user and save it
      let token = await Token.jsonwebtoken(user.id);
      // Send a POST request to the "/acts" endpoint with valid data and the JWT as an authorization header
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
      // Send a GET request to the "/acts" endpoint with the JWT as an authorization header
      let response = await request(app)
        .get("/acts")
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(response.statusCode).toEqual(200);
      expect(response.body.acts[0].name).toEqual("Elton John");
    });

    test("responds with a status code 400 if user_id/token not found", async () => {
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      // Create a JSON Web Token for the user and save it
      let token = await Token.jsonwebtoken(user.id);
      // Send a POST request to the "/acts" endpoint with valid data and the JWT as an authorization header
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
      // Send a GET request to the "/acts" endpoint without the JWT as an authorization header
      let response = await request(app).get("/acts").send();
      expect(response.statusCode).toEqual(400);
    });
  });

  describe("Delete", () => {
    test("responds with a status code 201 and deletes an act", async () => {
      // Create a new user and save it to the database
      let user = new User({
        name: "Robbie",
        email: "robbie@email.com",
        password: "password1",
      });
      await user.save();
      // Create a JSON Web Token for the user and save it
      let token = await Token.jsonwebtoken(user.id);
      // Send a POST request to the "/acts" endpoint with valid data and the JWT as an authorization header
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
      let acts = await Act.find();
      expect(acts.length).toEqual(1);
      // Assign the ID of the act to a variable
      const act_id = acts[0]._id;
      // Send a DELETE request to the "/acts" endpoint with the act ID and the JWT as an authorization header
      let response_2 = await request(app)
        .delete("/acts")
        .set("Authorization", `Bearer ${token}`)
        .set({ act_id: act_id })
        .send();

      let updatedActs = await Act.find();
      expect(response_2.statusCode).toEqual(200);
      expect(updatedActs.length).toEqual(0);
    });
  });
});
