import { Request, Response } from "express";
import Act, { IAct } from "../models/acts";
// Define a controller object for handling requests related to the "Act" model
const ActsController = {
  // Define a method for creating a new act
  Create: async (req: Request, res: Response): Promise<void> => {
    // Extract the relevant fields from the request body and create a new act object with them
    const { name, stage, date, start, end, user_id } = req.body;
    const act: IAct = new Act({ name, stage, date, start, end, user_id });
    try {
      // Save the new act to the database
      await act.save();
      res.status(200).json({ message: "OK" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Act not created" });
    }
  },
  // Define a method for finding acts belonging to a specific user
  Find: async (req: Request, res: Response) => {
    try {
      // Find all acts in the database with a matching user_id
      const acts = await Act.find({ user_id: req.body.user_id });
      res.status(200).json({ acts });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Acts not found" });
    }
  },
  // Define a method for deleting an act by ID
  Delete: async (req: Request, res: Response) => {
    try {
      // Find and delete an act with a matching _id field with the act_id passed in the request header
      await Act.findOneAndDelete({ _id: req.get("act_id") });
      res.status(200).json({ message: "DELETED" });
    } catch (err) {
      res.status(400).json({ message: "Act not deleted" });
    }
  },
};

export default ActsController;
