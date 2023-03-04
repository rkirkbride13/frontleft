import { Request, Response } from "express";
import Token from "../models/tokens";
import User from "../models/users";
import bcrypt from "bcrypt";

const TokensController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ message: "auth error - user does not exist" });
      return;
    }
    const match = await bcrypt
      .compare(password, user.password)
      .catch((error) => console.error(error));
    if (!match) {
      res.status(401).json({ message: "auth error - passwords do not match" });
    } else {
      const token = await Token.jsonwebtoken(user.id);
      res.status(201).json({ token: token, message: "OK" });
    }
  },
};

export default TokensController;
