import { Router } from "express";
import ActsController from "../controllers/acts";

const router: Router = Router();

router.post("/", ActsController.Create);
router.get("/", ActsController.Find);

export default router;
