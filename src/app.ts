import express from 'express';
import bodyParser from 'body-parser';
import {movieRouter} from './routers/movieRouter'

const app = express();

app.use(bodyParser.json());

app.use('/movies', movieRouter)

app.listen(80, () => {
    console.log('Server listening');
})