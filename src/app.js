"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movieRouter_1 = require("./routers/movieRouter");
const verifyAuth_1 = require("./routers/verifyAuth");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(verifyAuth_1.verifyAuth);
app.use('/movies', movieRouter_1.movieRouter);
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send({ error: err.message });
});
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
