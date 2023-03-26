"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
const secret = process.env.JWT_SECRET;
class Token {
    static jsonwebtoken(user_id) {
        return jsonwebtoken_1.default.sign({ user_id: user_id, iat: Math.floor(Date.now() / 1000) }, secret);
    }
}
exports.default = Token;
