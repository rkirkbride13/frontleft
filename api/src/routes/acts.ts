import { Router } from "express";
import ActsController from "../controllers/acts";

const router: Router = Router();

router.post("/", ActsController.Create);

export default router;
