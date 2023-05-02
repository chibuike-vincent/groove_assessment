"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_config_1 = __importDefault(require("./db_config"));
const auth_1 = __importDefault(require("./routes/auth"));
const projects_1 = __importDefault(require("./routes/projects"));
const token_1 = __importDefault(require("./routes/token"));
dotenv_1.default.config();
db_config_1.default.connect(process.env.MONGODB_URI);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (_, res) => {
    res.status(200).json({ message: "groove api running in good health state" });
});
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/project", projects_1.default);
app.use("/api/v1/token", token_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map