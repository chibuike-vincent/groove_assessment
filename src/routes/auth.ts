import { Router } from "express";
import { register, login } from "../controller/auth";
import { check } from "express-validator";

const router = Router();

router.post(
  "/register",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  register
);
router.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  login
);

export default router;
