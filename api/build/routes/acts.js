"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const acts_1 = __importDefault(require("../controllers/acts"));
const router = (0, express_1.Router)();
router.post("/", acts_1.default.Create);
exports.default = router;
