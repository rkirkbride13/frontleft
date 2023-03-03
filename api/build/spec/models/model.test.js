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
const mongoose_1 = __importDefault(require("mongoose"));
require("../mongodb_helper");
// import 'jest';
// import { DropCollectionOptions } from 'mongodb';
describe("Act", () => {
    let act;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.collections.acts.drop();
        act = yield acts_1.default.create({
            name: "Elton John",
            stage: "Pyramid",
            date: "2023-06-24",
            start: 2200,
            end: 2330,
        });
    }));
    it("should create an act", () => {
        expect(act.name).toEqual("Elton John");
        expect(act.stage).toEqual("Pyramid");
        expect(act.date).toEqual(new Date("2023-06-24"));
        expect(act.start).toEqual(2200);
        expect(act.end).toEqual(2330);
    });
    it("acts are saved to the database and can be accessed", () => __awaiter(void 0, void 0, void 0, function* () {
        const acts = yield acts_1.default.find();
        expect(acts.length).toEqual(1);
        expect(acts[0].name).toEqual("Elton John");
    }));
});
