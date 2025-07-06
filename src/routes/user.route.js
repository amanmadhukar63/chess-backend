import { Router } from "express";
import { login, logout, signup } from "../controllers/user.controller.js";

const router = Router();

router.route('/login').post(login);

router.route('/logout').post(logout);

router.route('/signup').post(signup);

export default router;