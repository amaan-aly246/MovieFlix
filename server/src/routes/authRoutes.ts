import { Router } from "express";

const router = Router();

import {
  logout,
  login,
  register,
  reGenerateToken,
  authenticateToken,
} from "../controllers/authControllers";
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh").get(reGenerateToken);
router.route("/logout").post(logout);
router.route("/verifytoken").post(authenticateToken);
export default router;
