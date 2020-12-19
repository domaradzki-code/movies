import express from 'express';
export const movieRouter = express.Router();

const getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('Here I am')
}

//movieRouter.post('/');

movieRouter.get('/', getMovies)
//exports.movieRouter = movieRouter;