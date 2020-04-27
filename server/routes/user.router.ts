import { Router } from "express";

import { auth, recaptcha } from "../middleware";
import UserController from "../controllers/userController";

const router: Router = Router();

router.post("/", UserController.register);
router.post("/login", recaptcha, UserController.login);
router.get("/logout", auth, UserController.logout);

router.get("/", auth, UserController.auth);
router.get("/all/:userId", auth, UserController.getUsers);

export default router;

