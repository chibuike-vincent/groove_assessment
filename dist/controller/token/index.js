"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellToken = exports.buyToken = exports.getTokenById = exports.getAllUserToken = exports.getAllProjectToken = void 0;
const tokens_1 = __importDefault(require("../../models/tokens"));
const projects_1 = __importDefault(require("../../models/projects"));
const mongodb_1 = require("mongodb");
const express_validator_1 = require("express-validator");
const getAllProjectToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield tokens_1.default.find({ project: req.params.projectId });
        return res.json(tokens);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal server error");
    }
});
exports.getAllProjectToken = getAllProjectToken;
const getAllUserToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokens = yield tokens_1.default.find({ investor: req.user.sub });
        return res.json(tokens);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal server error");
    }
});
exports.getAllUserToken = getAllUserToken;
const getTokenById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenId = req.params.tokenId;
        const token = yield tokens_1.default.findOne({ _id: new mongodb_1.ObjectId(tokenId) });
        if (!token) {
            return res.status(404).send("Token not found");
        }
        else {
            return res.json(token);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
});
exports.getTokenById = getTokenById;
const buyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { projectId } = req.params;
        const project = yield projects_1.default.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const token = new tokens_1.default({
            project: project._id,
            amount: req.body.amount,
            investor: req.user.sub,
        });
        yield token.save();
        return res.status(201).json(token);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
});
exports.buyToken = buyToken;
const sellToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { projectId, tokenId } = req.params;
        const project = yield projects_1.default.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const token = yield tokens_1.default.findById(tokenId);
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }
        if (token.investor.toString() !== req.user.sub) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const saleAmount = Number(token.amount) * Number(project.unitPrice);
        console.log(saleAmount, token.amount, project.unitPrice, "saleAmount");
        token.amount -= req.body.amount;
        project.targetAmount -= saleAmount;
        yield token.save();
        yield project.save();
        return res.json(token);
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
});
exports.sellToken = sellToken;
//# sourceMappingURL=index.js.map