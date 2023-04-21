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
  Find: async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.picture) {
        throw new Error();
      }

      res.set("Content-Type", "image/png");
      res.send(user.picture);
    } catch (error) {
      res.status(404).send();
    }
  },
};

export default PicturesController;
