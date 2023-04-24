import multer from "multer";
import { Router, Request } from "express";
import PicturesController from "../controllers/pictures";
// Set up Express router
const router: Router = Router();
// Set up Multer middleware for file uploads
const upload = multer({
  // Set file size limit to 3.5 MB (rough selfie size!)
  limits: {
    fileSize: 3500000,
  },
  // Define a file filter to only allow certain image file types
  fileFilter(req: Request, file, cb: Function) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    // If the file type is allowed, continue with the upload
    cb(undefined, true);
  },
  // Preserve the file path when storing the uploaded file
  preservePath: true,
});
// Set up route for adding pictures
router.post(
  "/",
  // Use Multer middleware to handle the file upload
  upload.fields([
    { name: "picture", maxCount: 1 },
    { name: "user_id", maxCount: 1 },
  ]),
  // Call the PicturesController Create function to handle the request
  PicturesController.Create
);
// Set up route for finding a users picture
router.get("/:id", PicturesController.Find);

export default router;
