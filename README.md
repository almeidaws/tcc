
# Miraculous

Miraculous is a website project created to study music recommendations algorithms. It's created using NodeJS technology on the server side and ReactJS on the client side. 

The creators are:
- [Gustavo Almeida](https://github.com/almeidaws/)
- [Renan Alves](https://github.com/RenanAlvesBCC)

# Introduction

This Wiki contains information about how to use each project's module and other things. If you want to see each declaration in deepth, you should see the documentation above each declaration in the source code.

In this repo, you'll find both Web API and the frontend. So you must be aware that you cannot use backend features in the frontend.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Project Structure](#project-structure)
3. [ReactJS](#reactjs)
4. [RESTFul API](#restful-api)

# Project setup

This project is being developed with NodeJS run-time engine using PostgreeSQL as database. It is being developed with Heroku service in mind. 

It contains the *development*, *test* and *production* environment. The *development* and *test* environments are purely local. The *production* environment should be configured by yourself using environment variables.

## Cloning

After cloning the repository, you must run `npm install` to download and install all the dependencies used on the project.

## Database

This project use environment variables to be configured and let private data outside the source code. To connect with some PostgreSQL database, you should use the `DATABASE_URL` environment variable. If you use Heroku Client to deploy, this variable is automatically defined.

In the development mode, the local database is used. You must install the local PostgreSQl 11 and create the databases `miraculous` and `miraculoustest`. It's accessed though `localhost:5432` with the username retrieved from environment variable `USER` and without a password.

If you run the tests with `npm test` command, the `miraculoustest` local database will be automatically used. The test environment also uses the environment variable `DATABASE_URL` to access the test database. But to run the test on a remote database you must set the environment variable `NOT_LOCAL` to `true`.

## Amazon S3

To store music's file, the Amazon S3 service is used. Each music contains some metadata in the database like name, genres and authors and the file actually used to play the sound stored in some bucket. To allow the backend upload some file into a bucket you must set some environment variables.

`AWS_ACCESS_KEY` is and key used to identify a user and `AWS_SECRET_ACCESS_KEY` is used to authenticated a user. Both keys can be retrieved through Amazon IAM service. There's also a variable used to identify the bucket's name. It can be `S3_BUCKET_PROD`, `S3_BUCKET_TEST` or `S3_BUCKET_DEV`, each one suffixed with the desired environment.

Currently, there's some automatic tests made with Jest that tries to connect with the Amazon S3, so you can run `npm test` to know if the communication with Amazon S3 is configured correctly.

## Finish

After that you can run the project with `npm start` command. The *start* script is configured to push a notification on Darwin operating systems. It also runs *nodemon* when files are changed. Note that every time a file is changed, the Webpack module is used to create a bundle. Currently the bundle contains React components.

# Project Structure

The project is structured using [Separation of Concerns Design Principle](https://en.wikipedia.org/wiki/Separation_of_concerns) in a way that related files is close to each other. This way, there's for example a directory called *musics* that contains queried used in database, functions that connect with the database, middleware functions used to handle routing and the tests for that module.

So if you want to known something about the user, you should search for the *users* directory.

# ReactJS

Both backend and frontend of this project are all contained inside this repo. Because of that, you should be aware when you are performing changes in the backend of frontend.

There's a folder named *dev* where you can create ReactJS Components and some other this that go on the frontend. This components are transpiled into *prod* folder. In the *prod* folder there's also some static html files that will be moved someday to out of that folder. In other words, the *prod* folder is an alias for the *build*/*public* folder.

# RESTful API

All the API used in this project are RESTful. Since it's an academic project, REST was used because it's recognized well defined standard for creating APIs. The status codes are the same from the HTTP protocol. You can learn more about they [here](https://www.restapitutorial.com/httpstatuscodes.html)

## Users

This section contains an explanation of each endpoint used to handle users. 

### Register

```
Route: /users
Method: POST
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    name: <string>
    email: <email>
    password: <password>

On success:
    Status: 201

On error:
    Status: 409
```

#### Error codes
- `409`: used when the email is being used by another user.

### Login

```
Route: /users/tokens
Method: POST
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    email: <email>
    password: <password>

On success:
    Status: 200
    Content: { id: <number>, token: <string> }

On error:
    Status: 401
```

It returns the user's id and the token that is used as an authorization on other requests. So it must be stored in someway on client side. 

#### Error codes
- `401`: used when the user's email or password is invalid or when there's no user with that email. 

### View informations

```
Route: /users/<id>
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded
    Authorization: <token>

Body:

On success:
    Status: 200
    Content: { name: <string>, token: <string> }

On error:
    Status: 401
```

When accessing the endpoint, you must provide the user's id retrieved when logging. You also must supply an authorization token also retrieved when logging.

#### Error codes
- `401`: used when the ID is from another user or when the access token is inexistent.

### Logout

```
Route: /users/tokens/<token>
Method: DELETE
Headers: 
   
Body:

On success:
    Status: 204
    Content: <Nothing>

On error:
    Status: 401
```

#### Error codes
- `401`: used when the access token isn't provided.

When logging out you are actually deleting your the Access Token. This Access Token must be supplied on the endpoint.
