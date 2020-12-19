import express from 'express';
import { apiFetchDetails } from '../apiCalls/apiFetchDetails';
import { decodedToken, MovieDetails } from "../interfaces";
import { countMoviesMonthly, createMovie, getMovies } from '../db/dbApi';
import { decode } from 'punycode';
export const movieRouter = express.Router();

const getMoviesFromDb = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const decoded: decodedToken = req.body.decoded
    const moviesList = await getMovies(decoded.name)
    res.send(moviesList)
}

const verifyAccountLimits =  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const decoded: decodedToken = req.body.decoded  
    if (decoded.role == 'premium') {
        next()
    }
    else {
        try {
            const registeredThisMonth = await countMoviesMonthly(decoded.name)
            if (registeredThisMonth < 5) {
                next()
            }
            else {
                res.status(400).send({error: "Limit of 5 movies monthly reached"})
            }
        }
        catch (err) {
            next(err)
        }
    }
}

const fetchMovieDetails = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { title } : { title: string } = req.body
    if (!title) {
        res.status(400).send({error: "No title provided"})
    }
    else {
        try {
            const details : MovieDetails = await apiFetchDetails(title);
            req.body.details = details;
            //res.send(details);
            next()
        } catch (error) {
            next(error)
        }
    }
}

const addMovieToDb = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const details: MovieDetails = req.body.details
    const decoded: decodedToken = req.body.decoded
    try { 
        await createMovie(details, decoded.name)
    }
    catch (err) {
        next(err)
    }
    res.send(details)
}

movieRouter.post('/', verifyAccountLimits, fetchMovieDetails, addMovieToDb);

movieRouter.get('/', getMoviesFromDb)
//exports.movieRouter = movieRouter;