# Node Full Text Search

A simple full text search engine for Node written in Typescript.

### Minimum Requirements
- Docker


### Stack
- [Express](https://expressjs.com/) as routing framework
- [Typescript](https://www.typescriptlang.org/) as programming language
- [Postgres](https://www.postgresql.org/) as Database
- [Mocha](https://mochajs.org/) as testing framework


### Download the code
First, we must download the code using git.
```sh
git clone https://github.com/swapnilkale91/NodeSearch.git

cd NodeSearch
```

### Setting up configuration
This project reads the configuration from environment variables. The default values can be found in `.env.sample` file. We will create a copy of this file as `.env`. During bootup [dotenv](https://www.npmjs.com/package/dotenv) will read this file & sets up the values in `process,env` variable which will be consumed by the application.
```sh
cp .env.sample .env

#Keep DB_HOST='postgres' if running docker on local.
#Keep DB_HOST='127.0.0.1' if running on local without docker.
```
> Feel free to modify this configuration values in this newly created file as per your setup. If you have different database setup, you will need to update those here.


# Running the application without Docker
As with every node project, we install the dependencies first, then build and start listening on the port.
```sh
npm install

npm start
```
If the postgres connects it will create the schema, tables and insert mock data into the database.

### Postman collection
Postman Collection can be found [here](NodeSearchApp.postman_collection.json)

#  Running the application with Docker
Before we start the project, we need to have the Postgres database up & running. For ease of development, this project ships with a [docker-compose](https://docs.docker.com/compose/) file which will setup the Postgres for you. Assuming you have the Docker installed, run the below command to setup Postgres

```sh
docker build -t mynodesearchapp .
docker-compose up -d
```

## Development
This section will be useful if you plan to do development on this code.
```sh
npm run watch
```

### NPM Scripts
First, you will need to be aware of the various build steps & their purpose. All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts). Npm scripts basically allow us to call (and chain) terminal commands via npm. To call a script, simply run `npm run <script-name>` from the command line.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `build`             | Compiles all source `.ts` files to `.js` files in the `build` folder |
|`serve `             | Runs the server from `build` as `node build/server.js` which is app's entry point |
| `start`             | Runs both `build` & `serve` commands |
| `test`              | Runs tests using Jest test runner |
|`test-coverage`      | Runs test but also collects coverage report |
| `watch-build`       | Runs the `build` command in watch mode |
| `watch-serve`       | Runs the `serve` command in watch mode. It uses `nodemon` & will restart the server if it crashes or any `.js` files updates |
| `watch`             | Concurrently runs both `watch-build` & `watch-serve`. This is the command you will mostly use during 

During development, you will mostly `npm run watch` & `npm run test`


### Testing
npm run test
