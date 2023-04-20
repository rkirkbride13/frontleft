"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
    mail_1.default.send({
        to: email,
        from: process.env.ADMIN_EMAIL,
        subject: "👾 Thanks for signing up 👾",
        text: `Welcome to frontleft, ${name}!\n\nTo use the app\n - Log in\n - Fill in fields for each artist/DJ\n - Note that date and time should be exact\n - Save them\n - Click the link for each day to see clashfinder\n\nI hope you enjoy it and let me know what you think.`,
    });
};
exports.default = sendWelcomeEmail;
