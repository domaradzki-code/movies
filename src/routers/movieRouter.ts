import express from 'express';
import { apiFetchDetails, MovieDetails } from '../apiCalls/apiFetchDetails';
import { createMovie } from '../db/dbApi';
export const movieRouter = express.Router();

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Here I am')
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
    await createMovie(req.body.details, req.body.decoded.name)
    res.send(req.body.details)
}

movieRouter.post('/', fetchMovieDetails, addMovieToDb);

movieRouter.get('/', getMovies)
//exports.movieRouter = movieRouter;