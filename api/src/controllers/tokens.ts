import { Request, Response } from "express";
import Token from "../models/tokens";
import User from "../models/users";
import bcrypt from "bcrypt";
// Define a controller object for handling requests related to authentication tokens
const TokensController = {
  // Define a method for creating a new authentication token
  Create: async (req: Request, res: Response): Promise<void> => {
    // Extract the email and password from the request body
    const { email, password } = req.body;
    // Find the user with the given email address
    const user = await User.findOne({ email: email });
    // If the user does not exist, send a 401 Unauthorized response
    if (!user) {
      res.status(401).json({ message: "auth error - user does not exist" });
      return;
    }
    // Compare the given password to the user's password hash
    const match = await bcrypt
      .compare(password, user.password)
      .catch((error) => console.error(error));
    // If the passwords do not match, send a 401 Unauthorized response
    if (!match) {
      res.status(401).json({ message: "auth error - passwords do not match" });
    } else {
      // If the passwords match, generate a new authentication token
      const token = await Token.jsonwebtoken(user.id);
      res.status(200).json({ user_id: user._id, token: token, message: "OK" });
    }
  },
};

export default TokensController;
