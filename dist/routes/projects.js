"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = require("../controller/project");
const isAuthenticated_1 = require("../helpers/isAuthenticated");
const checkUserType_1 = require("../helpers/checkUserType");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/", isAuthenticated_1.isAuth, checkUserType_1.checkUserType, [
    (0, express_validator_1.check)("name").not().isEmpty(),
    (0, express_validator_1.check)("artist").not().isEmpty(),
    (0, express_validator_1.check)("targetAmount").isNumeric(),
    (0, express_validator_1.check)("unitPrice").isNumeric(),
], project_1.creatProject);
router.get("/", isAuthenticated_1.isAuth, project_1.getAllProjects);
router.get("/:id", isAuthenticated_1.isAuth, project_1.getProjectById);
router.put("/:id", isAuthenticated_1.isAuth, checkUserType_1.checkUserType, project_1.updateProject);
router.delete("/:id", isAuthenticated_1.isAuth, checkUserType_1.checkUserType, project_1.deleteProject);
exports.default = router;
//# sourceMappingURL=projects.js.map