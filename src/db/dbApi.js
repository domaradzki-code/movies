"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDb = exports.countMoviesMonthly = exports.getMovies = exports.createMovie = void 0;
/**
 * This module is an API to abstract DB implementation from its interface. Currently it's using
 * either filesystem or MSSQL as a database, maybe adding MongoDB would be ok at some point in the future.
 */
const fileStorageDb_1 = require("./fileStorageDb");
const msSqlDb_1 = require("./msSqlDb");
if (process.env.DB_TYPE == 'MSSQL') {
    exports.createMovie = msSqlDb_1.createMovieMssql;
    exports.getMovies = msSqlDb_1.getMoviesMssql;
    exports.countMoviesMonthly = msSqlDb_1.countMoviesMonthlyMssql;
    exports.clearDb = () => { };
}
else {
    exports.createMovie = fileStorageDb_1.createMovieFs;
    exports.getMovies = fileStorageDb_1.getMoviesFs;
    exports.countMoviesMonthly = fileStorageDb_1.countMoviesMonthlyFs;
    exports.clearDb = fileStorageDb_1.clearDbFs;
}
