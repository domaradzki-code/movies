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
const verifyAccountLimits = async (req, res, next) => {
    const decoded = req.body.decoded;
    if (decoded.role == 'premium') {
        next();
    }
    else {
        try {
            const registeredThisMonth = await dbApi_1.countMoviesMonthly(decoded.name);
            if (registeredThisMonth < 5) {
                next();
            }
            else {
                res.status(400).send({ error: "Limit of 5 movies mothly reached" });
            }
        }
        catch (err) {
            next(err);
        }
    }
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
    const details = req.body.details;
    const decoded = req.body.decoded;
    try {
        await dbApi_1.createMovie(details, decoded.name);
    }
    catch (err) {
        next(err);
    }
    res.send(details);
};
exports.movieRouter.post('/', verifyAccountLimits, fetchMovieDetails, addMovieToDb);
exports.movieRouter.get('/', getMovies);
//exports.movieRouter = movieRouter;
