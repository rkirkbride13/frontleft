import { Request, Response } from "express";
import Act, { IAct } from "../models/acts";

const ActsController = {
  Create: async (req: Request, res: Response): Promise<void> => {
    const { name, stage, date, start, end } = req.body;

    const act: IAct = new Act({ name, stage, date, start, end });

    try {
      await act.save();
      res.status(201).json({ message: "OK" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

export default ActsController;
