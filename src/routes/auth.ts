import { Router } from "express";
import { register, login, fundWallet, getUserWallet } from "../controller/auth";
import { check } from "express-validator";
import { isAuth } from "../helpers/isAuthenticated";

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
router.put("/fund_wallet",isAuth, [check("amount").not().isEmpty()], fundWallet)
router.get("/wallet", isAuth, getUserWallet)

export default router;
