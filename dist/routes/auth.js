"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/register", [(0, express_validator_1.check)("username").not().isEmpty(), (0, express_validator_1.check)("password").not().isEmpty()], auth_1.register);
router.post("/login", [(0, express_validator_1.check)("username").not().isEmpty(), (0, express_validator_1.check)("password").not().isEmpty()], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map