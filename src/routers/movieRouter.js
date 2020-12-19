"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRouter = void 0;
const express_1 = __importDefault(require("express"));
const apiFetchDetails_1 = require("../apiCalls/apiFetchDetails");
const dbApi_1 = require("../db/dbApi");
exports.movieRouter = express_1.default.Router();
const getMovies = async (req, res, next) => {
    res.send('Here I am');
};
const fetchMovieDetails = async (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).send({ error: "No title provided" });
    }
    else {
        try {
            const details = await apiFetchDetails_1.apiFetchDetails(title);
            req.body.details = details;
            //res.send(details);
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
const addMovieToDb = async (req, res, next) => {
    await dbApi_1.createMovie(req.body.details, req.body.decoded.name);
    res.send(req.body.details);
};
exports.movieRouter.post('/', fetchMovieDetails, addMovieToDb);
exports.movieRouter.get('/', getMovies);
//exports.movieRouter = movieRouter;
