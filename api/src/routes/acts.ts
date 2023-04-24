import { Router } from "express";
import ActsController from "../controllers/acts";
// Set up Express router
const router: Router = Router();
// Set up route for creating acts
router.post("/", ActsController.Create);
// Set up route for finding acts belonging to a user
router.get("/", ActsController.Find);
// Set up route for deleting acts belonging to a user
router.delete("/", ActsController.Delete);

export default router;
