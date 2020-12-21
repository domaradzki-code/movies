# Application overview

This simple node.js application provides authenticated user with an endpoint /movies, where the user can make post request (providing a title of the movie that he wants to be added to his account) and post request to retrieve a list of already registered movies.

## Running with docker-compose

To run an application with docker-compose along with the authentication service, you should run `docker-compose up -d`, having created a `.env` file before. By default app will be running on port 80 with authorization service on port 3000, so make sure you have those ports accessible or change in docker-compose.

### Environment variables

Environment variables necessary to run the application should be defined in `.env` as follows:
```env
OMDB_APIKEY={valid apikey associated with the account in omdb}
JWT_SECRET={secret seed for both ends to sign/validate JWT tokens}

DB_TYPE={type of database}
```

Currently only supported types of database are MSSQL and local filesystem (leave DB_TYPE empty for that). If you want to use MSSQL, please refer to the section below, to see which else should be set in environment variables.

## Running tests

There are few test currently, created in jest. They should be run locally (meaning not with a docker compose) by `npm run test`. General idea of tests was demonstrated, more to come.

## Authorization service

Authorization service as available under `/auth` is a third-party component created by **Netguru** and available [here](https://github.com/netguru/nodejs-recruitment-task).

## MSSQL

Using repo created by [SoftwareDeveloperBlog](https://github.com/SoftwareDeveloperBlog/Mssql-docker-initialization-demo), docker-compose integration with MS SQL Server was added. For use it, you have to 
- create `mssql.env` file as 
```env
OMDB_APIKEY={valid apikey associated with the account in omdb}
JWT_SECRET={secret seed for both ends to sign/validate JWT tokens}

DB_TYPE=MSSQL #if not present, app uses file storage

MSSQL_USER=SA
MSSQL_PASSWORD=SuperStrongPassword!
MSSQL_SERVER={your machine public address (maybe localhost or container's alias)}
MSSQL_DB=DemoData
```
- run command `docker-compose -f docker-compose-mssql.yaml -d up`

Note that user, password and database name are currently hardcoded in SQL Server's Dockerfile - which is ok for this PoC project, but should be changed anywhere near production.