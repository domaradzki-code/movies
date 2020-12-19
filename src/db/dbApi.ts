export interface dbObject {
    Title: string
    Released: number
    Genre: string
    Director: string
    User: string
}

export { createMovie, getMovies } from './fileStorageDb';
