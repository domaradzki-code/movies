"use strict";
/**
 * This module is an API to abstract DB implementation from its interface. Currently it's using
 * filesystem as database, but should be switched for some real one.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDb = exports.countMoviesMonthly = exports.getMovies = exports.createMovie = void 0;
var fileStorageDb_1 = require("./fileStorageDb");
Object.defineProperty(exports, "createMovie", { enumerable: true, get: function () { return fileStorageDb_1.createMovie; } });
Object.defineProperty(exports, "getMovies", { enumerable: true, get: function () { return fileStorageDb_1.getMovies; } });
Object.defineProperty(exports, "countMoviesMonthly", { enumerable: true, get: function () { return fileStorageDb_1.countMoviesMonthly; } });
Object.defineProperty(exports, "clearDb", { enumerable: true, get: function () { return fileStorageDb_1.clearDb; } });
