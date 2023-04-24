import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import User from "../models/users";
// Define a controller object for handling requests related to user pictures
const PicturesController = {
  // Define a method for creating or updating a user picture
  Create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the picture buffer from the request
      const buffer = await sharp(
        (req.files as { picture: Express.Multer.File[] }).picture[0].buffer
      )
        // Resize the image to a maximum of 250x250 pixels, convert to PNG and convert to buffer
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      // Update the user record in the database with the new picture buffer
      await User.findOneAndUpdate(
        { _id: req.body.user_id },
        { picture: buffer }
      );
      res.send();
    } catch (error) {
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(400).send({ error: error.message });
      };
    }
  },
  // Define a method for finding and returning a user's picture
  Find: async (req: Request, res: Response) => {
    try {
      // Find the user with the given ID from the request parameters
      const user = await User.findById(req.params.id);
      // If the user or their picture does not exist, throw an error
      if (!user || !user.picture) {
        throw new Error();
      }
      // Set the response content type to image/png and send the picture buffer
      res.set("Content-Type", "image/png");
      res.send(user.picture);
    } catch (error) {
      res.status(404).send();
    }
  },
};

export default PicturesController;
