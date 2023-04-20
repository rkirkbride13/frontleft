import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
import sendWelcomeEmail from "../emails/account";

const UsersController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    let encryptedPassword;
    try {
      encryptedPassword = await bcrypt
        .genSalt(5)
        .then((salt) => bcrypt.hash(req.body.password, salt));

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      sendWelcomeEmail(req.body.email, req.body.name);
      res.status(200).json({ message: "OK" });
    } catch (err) {
      res.status(400).json({ message: "Bad request - user not created" });
    }
  },
};

export default UsersController;
