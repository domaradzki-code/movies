"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiFetchDetails = void 0;
const axios_1 = __importDefault(require("axios"));
const apiFetchDetails = async (title) => {
    const config = {
        method: 'GET',
        url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_APIKEY}&t=${title}`
    };
    try {
        const { data } = await axios_1.default.request(config);
        if (data.Error) {
            throw new Error(data.Error);
        }
        const result = {
            Title: data.Title,
            Released: data.Year,
            Genre: data.Genre,
            Director: data.Director
        };
        //console.log(result);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.apiFetchDetails = apiFetchDetails;
