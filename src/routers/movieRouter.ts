import express from 'express';
import { apiFetchDetails, MovieDetails } from '../apiCalls/apiFetchDetails';
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
            res.send(details);
            next()
        } catch (error) {
            next(error)
        }
    }
}

movieRouter.post('/', fetchMovieDetails);

movieRouter.get('/', getMovies)
//exports.movieRouter = movieRouter;