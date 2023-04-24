"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
// Load environment variables from a .env file
(0, dotenv_1.config)({ path: ".env" });
// Retrieve the JWT secret from the environment variables
const secret = process.env.JWT_SECRET;
// Define a class for creating JSON Web Tokens
class Token {
    // A static method for generating a JWT token
    static jsonwebtoken(user_id) {
        // Use the JWT library to sign the token payload using the secret key
        return jsonwebtoken_1.default.sign({ user_id: user_id, iat: Math.floor(Date.now() / 1000) }, secret);
    }
}
exports.default = Token;
