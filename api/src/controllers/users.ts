import { Request, Response } from "express";
import User, { IUser } from "../models/users";
import bcrypt from "bcrypt";

const UsersController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    let encryptedPassword;
    try {
      encryptedPassword = await bcrypt
        .genSalt(5)
        .then((salt) => bcrypt.hash(req.body.password, salt));

      const user: IUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      try {
        await user.save();
        res.status(201).json({ message: "OK" });
      } catch (err) {
        res.status(400).json({ messag: "Bad request" });
      }
    } catch (err) {
      res.status(400).json({ message: "Bad request" });
    }
  },
};

export default UsersController;
