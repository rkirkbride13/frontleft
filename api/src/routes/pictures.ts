import multer from "multer";
import { Router, Request } from "express";
import PicturesController from "../controllers/pictures";

const router: Router = Router();

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req: Request, file, cb: Function) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
  preservePath: true,
});

router.post(
  "/",
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "user_id", maxCount: 1 },
  ]),
  PicturesController.Create
);
router.get("/:id", PicturesController.Find);

export default router;
