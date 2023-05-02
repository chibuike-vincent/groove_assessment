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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../../models/users"));
const express_validator_1 = require("express-validator");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const existingUser = yield users_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        let userT;
        if (username.toLowerCase().includes("poprevadmin")) {
            userT = "admin";
        }
        else {
            userT = "user";
        }
        const newUser = new users_1.default({
            username,
            password: hashedPassword,
            userType: userT,
        });
        yield newUser.save();
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({
            username: newUser.username,
            sub: newUser._id,
            userType: newUser.userType,
        }, secret);
        return res.json({ token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Incorrect username or password" });
        }
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({
            username: user.username,
            sub: user._id,
            userType: user.userType,
        }, secret);
        return res.json({ token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.login = login;
//# sourceMappingURL=index.js.map