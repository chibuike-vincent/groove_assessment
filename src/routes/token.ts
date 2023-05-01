import { Router } from "express";
import {
  getAllProjectToken,
  getAllUserToken,
  getTokenById,
  buyToken,
  sellToken,
} from "../controller/token";
import { isAuth } from "../helpers/isAuthenticated";
import { check } from "express-validator";

const router = Router();

router.get("/:projectId/tokens", isAuth, getAllProjectToken);
router.get("/", isAuth, getAllUserToken);
router.get("/:tokenId", isAuth, getTokenById);
router.post(
  "/:projectId/tokens/buy",
  isAuth,
  [check("amount").isNumeric()],
  buyToken
);
router.post(
  "/:projectId/tokens/:tokenId/sell",
  isAuth,
  [check("amount").isNumeric()],
  sellToken
);

export default router;
