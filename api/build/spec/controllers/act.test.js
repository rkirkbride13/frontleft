"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acts_1 = __importDefault(require("../../models/acts"));
const app_1 = require("../../app");
const supertest_1 = __importDefault(require("supertest"));
require("../mongodb_helper");
const users_1 = __importDefault(require("../../models/users"));
const tokens_1 = __importDefault(require("../../models/tokens"));
describe("/acts", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.default.deleteMany({});
        yield acts_1.default.deleteMany({});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.default.deleteMany({});
        yield acts_1.default.deleteMany({});
    }));
    describe("Post", () => {
        test("responds with a status code 201 and creates an act", () => __awaiter(void 0, void 0, void 0, function* () {
            let user = new users_1.default({
                name: "Robbie",
                email: "robbie@email.com",
                password: "password1",
            });
            yield user.save();
            let token = yield tokens_1.default.jsonwebtoken(user.id);
            let response = yield (0, supertest_1.default)(app_1.app)
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
            let acts = yield acts_1.default.find();
            expect(acts.length).toEqual(1);
            expect(acts[0].name).toEqual("Elton John");
        }));
    });
    describe("Get", () => {
        test("responds with a status code 200, and returns all users acts", () => __awaiter(void 0, void 0, void 0, function* () {
            let user = new users_1.default({
                name: "Robbie",
                email: "robbie@email.com",
                password: "password1",
            });
            yield user.save();
            let token = yield tokens_1.default.jsonwebtoken(user.id);
            yield (0, supertest_1.default)(app_1.app)
                .post("/acts")
                .set("Authorization", `Bearer ${token}`)
                .send({
                name: "Elton John",
                stage: "Pyramid",
                date: "2023-06-24",
                start: 2200,
                end: 2330,
            });
            let response = yield (0, supertest_1.default)(app_1.app)
                .get("/acts")
                .set("Authorization", `Bearer ${token}`)
                .send();
            expect(response.statusCode).toEqual(200);
            expect(response.body.acts[0].name).toEqual("Elton John");
        }));
    });
});
