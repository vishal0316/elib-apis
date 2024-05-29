"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const userRouter_1 = __importDefault(require("./user/userRouter"));
const bookRouter_1 = __importDefault(require("./book/bookRouter"));
const app = (0, express_1.default)();
// Update the cors middleware to include https://elib-dashboard.onrender.com in the allowed origins
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://elib-frontend.vercel.app/",
        "https://elib-dashboard.onrender.com", // Add this line
    ],
    credentials: true,
}));
app.use(express_1.default.json());
// Routes
// Http methods: GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to elib apis" });
    // Remove the following line as it's redundant when using cors middleware
    // res.header("Access-Control-Allow-Origin", "*");
});
app.use("/api/users", userRouter_1.default);
app.use("/api/books", bookRouter_1.default);
// Global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
