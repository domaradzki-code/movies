"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countMoviesMonthlyMssql = exports.getMoviesMssql = exports.createMovieMssql = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER || 'localhost',
    database: process.env.MSSQL_DB,
    options: {
        enableArithAbort: true
    }
};
const createMovieMssql = async (details, username) => {
    try {
        const myPool = await new mssql_1.default.ConnectionPool(config).connect();
        const result = await myPool.request()
            .input('nowTimestamp', mssql_1.default.DateTime, new Date())
            .query(`INSERT INTO [dbo].[Movies]
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
                    ,@nowTimestamp)`);
        await myPool.close();
    }
    catch (err) {
        throw err;
    }
};
exports.createMovieMssql = createMovieMssql;
const getMoviesMssql = async (user) => {
    const myPool = await new mssql_1.default.ConnectionPool(config).connect();
    const result = await myPool.request()
        .input('username', user)
        .query(`
            SELECT * FROM Movies WHERE [User] = @username
        `);
    await myPool.close();
    return result.recordset;
};
exports.getMoviesMssql = getMoviesMssql;
const countMoviesMonthlyMssql = async (user) => {
    const myPool = await new mssql_1.default.ConnectionPool(config).connect();
    const result = await myPool.request()
        .input('username', user)
        .query(`
        SELECT count(*) as Count
        FROM Movies
        WHERE [User] = @username
            and MONTH([Timestamp]) = MONTH(CURRENT_TIMESTAMP)
            and YEAR([Timestamp]) = YEAR(CURRENT_TIMESTAMP)
    `);
    await myPool.close();
    return result.recordset[0].Count;
};
exports.countMoviesMonthlyMssql = countMoviesMonthlyMssql;
// createMovieMssql({Title: 'a', Released: 1, Genre: 'b', Director: 'c'}, 'usernae').then(() => {
// //getMoviesMssql('usernae').then(res => {console.log(res)})
// countMoviesMonthlyMssql('usernae')
// })
