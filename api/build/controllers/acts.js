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
const acts_1 = __importDefault(require("../models/acts"));
const ActsController = {
    Create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, stage, date, start, end, user_id } = req.body;
        const act = new acts_1.default({ name, stage, date, start, end, user_id });
        try {
            yield act.save();
            res.status(200).json({ message: "OK" });
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: "Act not created" });
        }
    }),
    Find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const acts = yield acts_1.default.find({ user_id: req.body.user_id });
            res.status(200).json({ acts });
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ message: "Acts not found" });
        }
    }),
    Delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield acts_1.default.findOneAndDelete({ _id: req.get("act_id") });
            res.status(200).json({ message: "DELETED" });
        }
        catch (err) {
            res.status(400).json({ message: "Act not deleted" });
        }
    }),
};
exports.default = ActsController;
