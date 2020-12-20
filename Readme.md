# Application overview

This simple node.js application provides authenticated user with an endpoint /movies, where the user can make post request (providing a title of the movie that he wants to be added to his account) and post request to retrieve a list of already registered movies.

## Running with docker-compose

To run an application with docker-compose along with the authentication service, you should run `docker-compose up -d`, having created a `.env` file before. By default app will be running on port 80 with authorization service on port 3000, so make sure you have those ports accessible or change in docker-compose.

### Environment variables

Environment variables necessary to run the application should be defined in `.env` as follows:
```env
OMDB_APIKEY={valid apikey associated with the account in omdb}
JWT_SECRET={secret seed for both ends to sign/validate JWT tokens}
```

## Running tests

There are few test currently, created in jest. They should be run locally (meaning not with a docker compose) by `npm run test`. General idea of tests was demonstrated, more to come.

## Authorization service

Authorization service as available under `/auth` is a third-party component created by **Netguru** and available [here](https://github.com/netguru/nodejs-recruitment-task).