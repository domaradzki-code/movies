import express from 'express';
import bodyParser from 'body-parser';
import {movieRouter} from './routers/movieRouter'
import { verifyAuth } from './routers/verifyAuth';

const app = express();

app.use(bodyParser.json());
app.use(verifyAuth)
app.use('/movies', movieRouter)
app.use((err: Error, req: express.Request, res:express.Response, next: express.NextFunction) => {
    console.log(err.stack); 
    res.status(400).send({error: err.message});
})

const port = 80;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})