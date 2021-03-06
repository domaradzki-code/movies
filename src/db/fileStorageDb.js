"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDbFs = exports.countMoviesMonthlyFs = exports.getMoviesFs = exports.createMovieFs = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const lodash_1 = __importDefault(require("lodash"));
const dir = 'db';
const path = dir + '/db.json';
if (!fs_1.default.existsSync(path)) {
    fs_1.default.mkdirSync(dir, { recursive: true });
    fs_1.default.writeFileSync(path, JSON.stringify([]), 'UTF-8');
}
const readFile = util_1.default.promisify(fs_1.default.readFile);
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
const createMovieFs = async (movie, user) => {
    const data = JSON.parse((await readFile(path)).toString());
    data.push({
        User: user,
        Title: movie.Title,
        Genre: movie.Genre,
        Director: movie.Director,
        Released: movie.Released,
        Timestamp: new Date().toString()
    });
    await writeFile(path, JSON.stringify(data));
};
exports.createMovieFs = createMovieFs;
const getMoviesFs = async (user) => {
    const data = JSON.parse((await readFile(path)).toString());
    const result = lodash_1.default.filter(data, (elem) => { return elem.User == user; });
    return result;
};
exports.getMoviesFs = getMoviesFs;
const countMoviesMonthlyFs = async (user) => {
    const now = new Date();
    const usersMovies = await exports.getMoviesFs(user);
    const result = lodash_1.default.filter(usersMovies, (movie) => {
        const timestamp = new Date(movie.Timestamp);
        return (timestamp.getMonth() == now.getMonth()) && (timestamp.getFullYear() == now.getFullYear());
    }).length;
    return result;
};
exports.countMoviesMonthlyFs = countMoviesMonthlyFs;
const clearDbFs = async () => {
    await writeFile(path, '[]');
};
exports.clearDbFs = clearDbFs;
