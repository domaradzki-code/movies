"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movieRouter_1 = require("./routers/movieRouter");
const verifyAuth_1 = require("./routers/verifyAuth");
exports.app = express_1.default();
exports.app.use(body_parser_1.default.json());
exports.app.use(verifyAuth_1.verifyAuth);
exports.app.use('/movies', movieRouter_1.movieRouter);
exports.app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send({ error: err.message });
});
const port = 80;
const server = exports.app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
function handler() {
    server.close();
}
exports.handler = handler;
