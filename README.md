# Boilerplate
This is a node boilerplate meant to be used as a skeleton for a new node application. 
Its main purpose is to provide a generic API easily deployable to heroku with Redis and Postgres free addons in order to have a quick start point with robust authentication/authorization techniques without many dependencies.

### Dev environment prerequisites:
* npm
* NodeJS
* Postgres
* Redis

### Dependencies:
```json
{
  "awilix": "^3.0.9",
  "awilix-express": "^1.1.0",
  "body-parser": "^1.18.3",
  "chai": "^4.2.0",
  "crypto": "^1.0.1",
  "dotenv": "^6.1.0",
  "express": "^4.16.4",
  "express-jwt": "^5.3.1",
  "express-session": "^1.15.6",
  "glob": "^7.1.3",
  "jsonwebtoken": "^8.5.1",
  "mocha": "^5.2.0",
  "pg": "^7.9.0",
  "pg-hstore": "^2.3.2",
  "redis": "^2.8.0",
  "sequelize": "^5.2.12",
  "sequelize-cli": "^5.4.0"
}
```

## Index

- [0 Environments](#0-environments)
- [1 DB](#1-db) 
- [2 Dependency Injection (IOC)](#2-dependency-injection) 
- [3 Authentication Endpoints](#3-authentication-endpoints) 
- [4 Tests](#4-tests) 
- [5 Error Handling](#5-error-handling)

## 0 Environments

* Create a heroku account
* Create new application
* Add postgres and redis addons (you'll need to add a credit card to validate account but it's still free)
* Attach heroku application to your git master branch
* Push to master to deploy application (but fist follow the rest of the steps to configure the env)
* Create a .env file in the root folder with the following information:
```
PORT = 80
TOKEN_EXPIRESON = 30
DATABASE_URL = postgres://postgres:@127.0.0.1:5432/[database-name]
REDIS_URL = redis://localhost:6379
```
* To start developing use
```bash
  npm run startdev
``` 

## 1 DB

### Existing migrations

* Configure `/app/config/config.json` file with credentials to dev and production databases
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres",
    "ssl":true,
    "dialectOptions":{
       "ssl":{
          "require":true
       }
    }
  }
}
```
* Go to `/app` folder 
```bash 
cd app
```
* Run migrations in dev environment
```bash
npx sequelize db:migrate
```
* Run migrations in production environment
```bash 
npx sequelize db:migrate --env production
``` 

### Add new migrations

* Go to `/app` folder 
```bash 
cd app
```
* Create a migration file that you need to edit (`app/models` folder)
```bash
npx sequelize migration:generate --name [name_of_your_migration]
```

## 2 Dependency Injection

The container placed in `app/ioc/container.js` is configured to get by convention every file that meets the expression `**/*.service.js` so that is the naming convention that you should follow for every service.

It is expected to split the architecture in app/domain-entity and inside that folder the following structure:
* `app/domain-entity/domain-entity.api` (api endpoints and particular middlewares for that api)
* `app/domain-entity/domain-entity.application` (application services - to orchestrate the connection between db and domain entities)
* `app/domain-entity/domain-entity.domain` (hard business logic)

Also the api endpoints are expected to meet the namig expression `**/*.api.js` that `app/ioc/router.js` sets.

It is possible to manually inject other classes or functions in the container if needed.

## 3 Authentication Endpoints

### 3.1 Login

#### 3.1.1 Request endpoint

```http
POST /api/sessions
```

#### 3.1.2 Request expected body

```json
{
  "username" : "admin",
  "password" : "123456"
}
```
#### 3.1.3 Response example

```json
{
  "id": 1,
  "username": "admin",
  "token": "499eedc1-8e42-44b1-9e69-83139abd12d6"
}
```

#### 3.1.4 Status codes

| Status Code | Type | Description |
|-------------| ----------- | ----------- | 
| 200 | `OK` | Ok |
| 400 | `BAD REQUEST` | Incorrect username or password |
| 500 | `INTERNAL SERVER ERROR`| Unexpected server error |

### 3.2 Create User

#### 3.2.1 Request endpoint

```http
POST /api/users
```

#### 3.2.2 Request expected body

```json
{
  "username" : "admin",
  "password" : "123456"
}
```
#### 3.2.3 Response example

```json
{
  "id": 1,
  "username": "admin"
}
```

#### 3.2.4 Status codes

| Status Code | Type | Description |
|-------------| ----------- | ----------- | 
| 200 | `OK` | Ok |
| 400 | `BAD REQUEST` | Username already exists |
| 500 | `INTERNAL SERVER ERROR`| Unexpected server error |

### 3.3 Get User

#### 3.3.1 Request endpoint

```http
GET /api/users/:id
```

#### 3.3.2 Request Headers

| Status Code | Type | 
|-------------| ----------- | 
| `auth` | `{{sessionToken}}` | 

#### 3.3.3 Response example

```json
{
  "id": 1,
  "username": "admin"
}
```

#### 3.3.4 Status codes

| Status Code | Type | Description |
|-------------| ----------- | ----------- | 
| 200 | `OK` | Ok |
| 401 | `BAD REQUEST` | invalid token |
| 403 | `BAD REQUEST` | Token expired |
| 404 | `NOT FOUND` | Usern not found |
| 500 | `INTERNAL SERVER ERROR`| Unexpected server error |

## 4 Tests

In `/test/suite.js` every file that meets the expression `**/*.test.js` is used when running the test script with mocha + chai. This allows you to place the tests right next to your logic to enable quick access to them for other developers.
You can see an example in `/app/users/users.application/tests`.

To run tests:

```bash
npm test
```

## 5 Error Handling

In your `entity/[entity.api]` folder, you should create another folder called middleware that has an errorMiddleware that catches every error specific to your entity's api.
This makes it easier to document the specific errors each endpoint returns. For more info about how to set up error middlewares in your api check `awilix-express` documentation.