import { Router } from "express";
import { tester } from "../controllers/user.controller.js";

const router = Router();

router.route('/test').post(tester);

export default router;