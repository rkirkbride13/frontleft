"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const acts_1 = __importDefault(require("./routes/acts"));
const users_1 = __importDefault(require("./routes/users"));
(0, dotenv_1.config)({ path: './config.env' });
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/acts', acts_1.default);
app.use('/users', users_1.default);
