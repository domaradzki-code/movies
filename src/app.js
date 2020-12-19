"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movieRouter_1 = require("./routers/movieRouter");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/movies', movieRouter_1.movieRouter);
app.listen(80, () => {
    console.log('Server listening');
});
