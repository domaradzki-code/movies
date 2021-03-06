import axios, { AxiosRequestConfig } from 'axios';
import { MovieDetails } from '../interfaces';

export const apiFetchDetails = async (title : string) => {
    const config : AxiosRequestConfig = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&t=${title}`
    }
    try {
        const {data} = await axios.request(config);        
        if (data.Error) {
            throw new Error(data.Error)
        }
        const result: MovieDetails = {
            Title: data.Title,
            Released: data.Year,
            Genre: data.Genre,
            Director: data.Director
        }
        //console.log(result);
        return result
    }
    catch (err) {
        throw err;
    }
}
