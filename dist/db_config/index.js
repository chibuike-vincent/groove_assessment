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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const options = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
class db {
    connect(DB_URL) {
        mongoose
            .connect(DB_URL, options)
            .then(() => __awaiter(this, void 0, void 0, function* () {
            console.log(`Successfully connected to ${DB_URL}`);
        }))
            .catch((err) => {
            console.error(`There was a db connection error ${err}`);
            process.exit(0);
        });
        const db = mongoose.connection;
        db.once("disconnected", () => {
            console.error(`Successfully disconnected from ${DB_URL}`);
        });
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                console.error("dBase connection closed due to app termination");
                process.exit(0);
            });
        });
    }
}
exports.default = new db();
//# sourceMappingURL=index.js.map