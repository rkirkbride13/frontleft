"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokens_1 = __importDefault(require("../../models/tokens"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from a .env file
dotenv_1.default.config();
describe("Token", () => {
    it("returns a token containing the user_id", () => {
        // Use Jest's fake timers to set the current time to a specific value
        jest.useFakeTimers();
        jest.setSystemTime(new Date(Date.UTC(2023, 2, 3, 11, 37, 0)));
        // Define the user_id and generate a token
        const user_id = "123abc";
        const token = tokens_1.default.jsonwebtoken(user_id);
        // Verify that the token payload contains the correct user_id and timestamp
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        expect(payload).toEqual({ iat: 1677843420, user_id: "123abc" });
    });
});
