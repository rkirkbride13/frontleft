import { Request, Response } from "express";
import User from "../models/users";
import bcrypt from "bcrypt";
import sendWelcomeEmail from "../emails/account";
// Define a controller object for handling requests related to users
const UsersController = {
  // Define a method for creating a new user
  Create: async (req: Request, res: Response): Promise<void> => {
    let encryptedPassword;
    try {
      // Generate a salt and hash the password using bcrypt
      encryptedPassword = await bcrypt
        .genSalt(5)
        .then((salt) => bcrypt.hash(req.body.password, salt));
      // Create a new user record in the database
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      // Send a welcome email to the user
      sendWelcomeEmail(req.body.email, req.body.name);
      res.status(200).json({ message: "OK" });
    } catch (err) {
      res.status(400).json({ message: "Bad request - user not created" });
    }
  },
};

export default UsersController;
