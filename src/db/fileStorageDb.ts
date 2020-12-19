import fs from 'fs'
import util from 'util'
import { MovieDetails } from "../interfaces"
import _ from 'lodash'
import { dbObject } from '../interfaces'

const path = 'db.json'
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]), 'UTF-8')
}

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

export const createMovie = async (movie: MovieDetails, user: string) => {
    const data: Array<dbObject> = JSON.parse((await readFile(path)).toString())
    data.push({
        User: user, 
        Title: movie.Title, 
        Genre: movie.Genre, 
        Director: movie.Director, 
        Released: movie.Released,
        Timestamp: new Date().toString()
    })
    await writeFile(path, JSON.stringify(data))
}

export const getMovies = async (user: string) => {
    const data: Array<dbObject> = JSON.parse((await readFile(path)).toString())
    const result = _.filter(data, (elem) => {return elem.User == user})
    return result
}

export const countMoviesMonthly = async (user: string) => {
    const now = new Date()
    const usersMovies = await getMovies(user)
    const result = _.filter(usersMovies, (movie) => {
        const timestamp = new Date(movie.Timestamp)
        return (timestamp.getMonth() == now.getMonth()) && (timestamp.getFullYear() == now.getFullYear())
    }).length
    return result
}