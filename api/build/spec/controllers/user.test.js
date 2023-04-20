"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
require("../mongodb_helper");
const users_1 = __importDefault(require("../../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_1 = __importDefault(require("../../emails/account"));
jest.mock("../../emails/account", () => jest.fn());
describe("/users", () => {
  beforeEach(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield users_1.default.deleteMany({});
    })
  );
  describe("post when email and password are provided", () => {
    it("gives response code 201 and creates a user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({
            name: "Robbie",
            email: "robbie@email.com",
            password: "password",
          });
        expect(account_1.default).toHaveBeenCalledWith(
          "robbie@email.com",
          "Robbie"
        );
        expect(response.statusCode).toBe(200);
        let users = yield users_1.default.find();
        let newUser = users[users.length - 1];
        expect(newUser.email).toEqual("robbie@email.com");
      }));
    it("encrypts the password", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({
            name: "Robbie",
            email: "robbie@email.com",
            password: "password",
          });
        expect(response.statusCode).toBe(200);
        let users = yield users_1.default.find();
        let newUser = users[users.length - 1];
        bcrypt_1.default
          .compare("password", newUser.password)
          .then((res) => expect(res).toBe(true));
      }));
  });
  describe("post when name not provided", () => {
    it("gives response code 400 and does NOT create user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({ email: "robbie@email.com", password: "password1" });
        expect(response.statusCode).toBe(400);
        let users = yield users_1.default.find();
        expect(users.length).toEqual(0);
      }));
  });
  describe("post when email not provided", () => {
    it("gives response code 400 and does NOT create user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({ name: "Robbie", password: "password1" });
        expect(response.statusCode).toBe(400);
        let users = yield users_1.default.find();
        expect(users.length).toEqual(0);
      }));
  });
  describe("post when password not provided", () => {
    it("gives response code 400 and does NOT create user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({ name: "Robbie", email: "robbie@email.com" });
        expect(response.statusCode).toBe(400);
        let users = yield users_1.default.find();
        expect(users.length).toEqual(0);
      }));
  });
  describe("post when email is invalid", () => {
    it("gives response code 400 and does NOT create user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({
            name: "Robbie",
            email: "robbieemail.com",
            password: "password1",
          });
        expect(response.statusCode).toBe(400);
        let users = yield users_1.default.find();
        expect(users.length).toEqual(0);
      }));
  });
  describe("post when email exists in DB", () => {
    it("gives response code 400 and does NOT create user", () =>
      __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.default.create({
          name: "Robbie",
          email: "robbie@email.com",
          password: "password1",
        });
        let response = yield (0, supertest_1.default)(app_1.app)
          .post("/users")
          .send({
            name: "Robbie New",
            email: "robbie@email.com",
            password: "password100",
          });
        expect(response.statusCode).toBe(400);
        let users = yield users_1.default.find();
        expect(users.length).toEqual(1);
      }));
  });
});
