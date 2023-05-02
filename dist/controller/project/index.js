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
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getAllProjects = exports.creatProject = void 0;
const projects_1 = __importDefault(require("../../models/projects"));
const express_validator_1 = require("express-validator");
const creatProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, artist, targetAmount, unitPrice } = req.body;
        const project = new projects_1.default({
            name,
            artist,
            targetAmount,
            unitPrice,
            createdBy: req.user.sub,
        });
        yield project.save();
        return res.status(201).send(project);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.creatProject = creatProject;
const getAllProjects = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projects_1.default.find();
        return res.status(200).send(projects);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.getAllProjects = getAllProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projects_1.default.findById(req.params.id);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        return res.status(200).send(project);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, artist, targetAmount } = req.body;
        const project = yield projects_1.default.findByIdAndUpdate(req.params.id, { name, description, artist, targetAmount }, { new: true });
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        return res.status(200).send(project);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projects_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        return res.status(204).send(project);
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
exports.deleteProject = deleteProject;
//# sourceMappingURL=index.js.map