import { Router } from "express";

const router = Router();

import {
  logout,
  login,
  register,
  reGenerateToken,
} from "../controllers/authControllers";
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refresh").get(reGenerateToken);
export default router;
