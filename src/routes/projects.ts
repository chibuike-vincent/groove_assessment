import { Router } from "express";
import {
  creatProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAllArtistProjects
} from "../controller/project";
import { isAuth } from "../helpers/isAuthenticated";
import { checkUserType } from "../helpers/checkUserType";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  isAuth,
  checkUserType,
  [
    check("name").not().isEmpty(),
    check("artistId").not().isEmpty(),
    check("targetAmount").isNumeric(),
    check("unitPrice").isNumeric(),
  ],
  creatProject
);
router.get("/", isAuth, getAllProjects);
router.get("/artist/:id", isAuth, getAllArtistProjects)
router.get("/:id", isAuth, getProjectById);
router.put("/:id", isAuth, checkUserType, updateProject);
router.delete("/:id", isAuth, checkUserType, deleteProject);

export default router;
