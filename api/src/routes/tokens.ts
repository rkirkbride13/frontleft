import { Router } from "express";
import TokensController from "../controllers/tokens";
// Set up Express router
const router: Router = Router();
// Set up route for creating tokens
router.post("/", TokensController.Create);

export default router;
