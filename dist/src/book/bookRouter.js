"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const express_1 = __importDefault(require("express"));
const bookController_1 = require("./bookController");
const multer_1 = __importDefault(require("multer"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const bookRouter = express_1.default.Router();
// file store local ->
const upload = (0, multer_1.default)({
    dest: node_path_1.default.resolve(__dirname, "../../public/data/uploads"),
    // todo: put limit 10mb max.
    limits: { fileSize: 3e7 }, // 30mb 30 * 1024 * 1024
});
// routes
// /api/books
bookRouter.post("/", authenticate_1.default, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), bookController_1.createBook);
bookRouter.patch("/:bookId", authenticate_1.default, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
]), bookController_1.updateBook);
bookRouter.get("/", bookController_1.listBooks);
bookRouter.get("/:bookId", bookController_1.getSingleBook);
bookRouter.delete("/:bookId", authenticate_1.default, bookController_1.deleteBook);
exports.default = bookRouter;
