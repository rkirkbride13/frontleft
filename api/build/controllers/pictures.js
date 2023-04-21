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
const sharp_1 = __importDefault(require("sharp"));
const users_1 = __importDefault(require("../models/users"));
const PicturesController = {
    Create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const buffer = yield (0, sharp_1.default)(req.files.picture[0].buffer)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();
            yield users_1.default.findOneAndUpdate({ _id: req.body.user_id }, { picture: buffer });
            res.send();
        }
        catch (error) {
            (error, req, res, next) => {
                res.status(400).send({ error: error.message });
            };
        }
    }),
    Find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield users_1.default.findById(req.params.id);
            if (!user || !user.picture) {
                throw new Error();
            }
            res.set("Content-Type", "image/png");
            res.send(user.picture);
        }
        catch (error) {
            res.status(404).send();
        }
    }),
};
exports.default = PicturesController;
