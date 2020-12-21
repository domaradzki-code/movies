import sql, { pool } from 'mssql'
import { MovieDetails } from '../interfaces'

const config: sql.config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER || 'localhost',
    database: process.env.MSSQL_DB,
    options: {
        enableArithAbort: true
    }
}

export const createMovieMssql = async (details: MovieDetails, username: string)=> {
    try {
        const myPool = await new sql.ConnectionPool(config).connect()
        const result = await myPool.request()
            .input('nowTimestamp', sql.DateTime, new Date())
            .query(
                `INSERT INTO [dbo].[Movies]
                    ([Title]
                    ,[Released]
                    ,[Genre]
                    ,[Director]
                    ,[User]
                    ,[Timestamp])
                VALUES
                    ('${details.Title}'
                    ,${details.Released}
                    ,'${details.Genre}'
                    ,'${details.Director}'
                    ,'${username}'
                    ,@nowTimestamp)`
            )
        await myPool.close()
    }
    catch (err) {
        throw err
    }
}

export const getMoviesMssql = async (user: string) => {
    const myPool = await new sql.ConnectionPool(config).connect()
    const result = await myPool.request()
        .input('username', user)
        .query(`
            SELECT * FROM Movies WHERE [User] = @username
        `)
    await myPool.close()
    return result.recordset
}

export const countMoviesMonthlyMssql = async (user: string) => {
    const myPool = await new sql.ConnectionPool(config).connect()
    const result = await myPool.request()
    .input('username', user)
    .query(`
        SELECT count(*) as Count
        FROM Movies
        WHERE [User] = @username
            and MONTH([Timestamp]) = MONTH(CURRENT_TIMESTAMP)
            and YEAR([Timestamp]) = YEAR(CURRENT_TIMESTAMP)
    `)
    await myPool.close()
    return result.recordset[0].Count
}

// createMovieMssql({Title: 'a', Released: 1, Genre: 'b', Director: 'c'}, 'usernae').then(() => {
// //getMoviesMssql('usernae').then(res => {console.log(res)})
// countMoviesMonthlyMssql('usernae')
// })
