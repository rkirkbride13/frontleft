import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import User from "../models/users";

const PicturesController = {
  Create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const buffer = await sharp(
        (req.files as { picture: Express.Multer.File[] }).picture[0].buffer
      )
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
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
};

export default PicturesController;
