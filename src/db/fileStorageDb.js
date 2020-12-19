"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = exports.createMovie = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const lodash_1 = __importDefault(require("lodash"));
const path = 'db.json';
if (!fs_1.default.existsSync(path)) {
    fs_1.default.writeFileSync(path, JSON.stringify([]), 'UTF-8');
}
const readFile = util_1.default.promisify(fs_1.default.readFile);
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
const createMovie = async (movie, user) => {
    const data = JSON.parse((await readFile(path)).toString());
    data.push({
        User: user,
        Title: movie.Title,
        Genre: movie.Genre,
        Director: movie.Director,
        Released: movie.Released
    });
    await writeFile(path, JSON.stringify(data));
};
exports.createMovie = createMovie;
const getMovies = async (user) => {
    const data = JSON.parse((await readFile(path)).toString());
    const result = lodash_1.default.filter(data, (elem) => { return elem.User == user; });
    return result;
};
exports.getMovies = getMovies;
