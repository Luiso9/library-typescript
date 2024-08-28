"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
function registerRoutes(app) {
    app.get("/products", (req, res) => {
        res.status(200).json({ message: "server is running" });
    });
    app.use("/auth", AuthRoutes_1.default);
}
