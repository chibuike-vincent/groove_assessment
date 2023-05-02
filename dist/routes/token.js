"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../controller/token");
const isAuthenticated_1 = require("../helpers/isAuthenticated");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/:projectId/tokens", isAuthenticated_1.isAuth, token_1.getAllProjectToken);
router.get("/", isAuthenticated_1.isAuth, token_1.getAllUserToken);
router.get("/:tokenId", isAuthenticated_1.isAuth, token_1.getTokenById);
router.post("/:projectId/tokens/buy", isAuthenticated_1.isAuth, [(0, express_validator_1.check)("amount").isNumeric()], token_1.buyToken);
router.post("/:projectId/tokens/:tokenId/sell", isAuthenticated_1.isAuth, [(0, express_validator_1.check)("amount").isNumeric()], token_1.sellToken);
exports.default = router;
//# sourceMappingURL=token.js.map