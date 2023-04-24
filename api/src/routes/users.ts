import { Router } from "express";
import UsersController from "../controllers/users";
// Set up Express router
const router: Router = Router();
// Set up route for creating users
router.post("/", UsersController.Create);

export default router;
