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
const users_1 = __importDefault(require("../../models/users"));
require("../mongodb_helper");
describe("User", () => {
    let user;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.default.deleteMany();
        user = yield users_1.default.create({
            name: "Robbie",
            email: "robbie@email.com",
            password: "password1",
        });
    }));
    it("has a name, email and password", () => {
        expect(user.name).toEqual("Robbie");
        expect(user.email).toEqual("robbie@email.com");
        expect(user.password).toEqual("password1");
    });
    it("users are saved to the database and can be accessed", () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield users_1.default.find();
        expect(users.length).toEqual(1);
        expect(users[0].name).toEqual("Robbie");
    }));
    it("cannot create a user with an existing email address", () => __awaiter(void 0, void 0, void 0, function* () {
        let dupilcate = new users_1.default({
            name: "Robbie New",
            email: "robbie@email.com",
            password: "password2",
        });
        dupilcate
            .save()
            .then(() => fail("No error raised when saving the file"))
            .catch((error) => { });
        const users = yield users_1.default.find();
        expect(users.length).toEqual(1);
    }));
});
