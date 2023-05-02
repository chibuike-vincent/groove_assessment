import { Router } from "express";
import {
  creatArtist,
  getAllArtist,
  getArtistById,
  updateArtist,
  deleteArtist,
} from "../controller/artist";
import { isAuth } from "../helpers/isAuthenticated";
import { checkUserType } from "../helpers/checkUserType";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  isAuth,
  checkUserType,
  [
    check("name").not().isEmpty()
  ],
  creatArtist
);
router.get("/", isAuth, getAllArtist);
router.get("/:id", isAuth, getArtistById);
router.put("/:id", isAuth, checkUserType, updateArtist);
router.delete("/:id", isAuth, checkUserType, deleteArtist);

export default router;
