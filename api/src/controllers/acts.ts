import { Request, Response } from "express";
import Act, { IAct } from "../models/acts";

const ActsController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    const { name, stage, date, start, end, user_id } = req.body;
    const act: IAct = new Act({ name, stage, date, start, end, user_id });

    try {
      await act.save();
      res.status(201).json({ message: "OK" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Trip not created" });
    }
  },
  Find: async (req: Request, res: Response) => {
    try {
      const acts = await Act.find({ user_id: req.body.user_id })
      res.status(200).json({ acts })
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Trips not found" });
    }
  }
};

export default ActsController;
