import { Router } from "express";
import ActsController from "../controllers/acts";

const router: Router = Router();

router.post("/", ActsController.Create);
router.get("/", ActsController.Find);
router.delete("/", ActsController.Delete);

export default router;
