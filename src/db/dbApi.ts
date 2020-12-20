/**
 * This module is an API to abstract DB implementation from its interface. Currently it's using 
 * filesystem as database, but should be switched for some real one.
 */

export { createMovie, getMovies, countMoviesMonthly, clearDb } from './fileStorageDb';