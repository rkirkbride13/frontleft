"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const pictures_1 = __importDefault(require("../controllers/pictures"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 3500000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
    },
    preservePath: true,
});
router.post("/", upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "user_id", maxCount: 1 },
]), pictures_1.default.Create);
router.get("/:id", pictures_1.default.Find);
exports.default = router;
