/**
 * This module is an API to abstract DB implementation from its interface. Currently it's using 
 * filesystem as database, but should be switched for some real one.
 */
import { createMovieFs, getMoviesFs, countMoviesMonthlyFs, clearDbFs } from './fileStorageDb';
import {createMovieMssql, getMoviesMssql, countMoviesMonthlyMssql} from './msSqlDb'

export let createMovie: Function
export let getMovies: Function
export let countMoviesMonthly: Function
export let clearDb: Function

if (process.env.DB_TYPE == 'MSSQL') {
    createMovie = createMovieMssql
    getMovies = getMoviesMssql
    countMoviesMonthly = countMoviesMonthlyMssql
    clearDb = () => {}
}
else {
    createMovie = createMovieFs
    getMovies = getMoviesFs
    countMoviesMonthly = countMoviesMonthlyFs
    clearDb = clearDbFs
}