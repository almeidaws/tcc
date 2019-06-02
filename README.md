

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
4. [Database Modeling](#database-modeling)
5. [RESTFul API](#restful-api)
    1. [Users](#users)
        1. [Login a user](#login-a-user)
        2. [View informations from a user](#view-informations-from-a-user)
        3. [Logout a user](#logout-a-user)
    2. [Authors](#authors)
        1. [Add an author](#add-an-author)
        2. [Get all authors](#get-all-authors)
        3. [Get an author by its ID](#get-an-author-by-its-id)
        4. [Get all authors from a music](#get-all-authors-from-a-music)
    3. [Genres](#genres)
        1. [Get all genres](#get-all-genres)
        2. [Get all genres from a music](#get-all-genres-from-a-music)
    4. [Musics](#musics)
        1. [Add a music](#add-a-music)
        2. [Get all musics](#get-all-musics)
        3. [Get a music by ID](#get-a-music-by-id)
        4. [Delete a music](#delete-a-music)
    5. [Favorites](#favorites)
        1. [Add a favorite](#add-a-favorite)
        2. [Get all favorited musics from a user](#get-all-favorited-musics-from-a-user)
        3. [Delete a favorite](#delete-a-favorite)


# Project setup

This project is being developed with NodeJS run-time engine using PostgreeSQL as database. It is being developed with Heroku service in mind. 

It contains the *development*, *test* and *production* environment. The *development* and *test* environments are purely local. The *production* environment should be configured by yourself using environment variables.

## Cloning

After cloning the repository, you must run `npm install` to download and install all the dependencies used on the project.

## PostgreSQL

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

There's a folder named `dev` where you can create ReactJS Components and some other this that go on the frontend. This components are transpiled into `prod` folder. In the `prod` folder there's also some static html files that will be moved someday to out of that folder. In other words, the `prod` folder is an alias for the `build`/`public` folder.

# Database Modeling

![Miraculous Database Model](https://github.com/almeidaws/tcc/blob/master/Miraculous%20Database%20Model.png)

The database data model is available here forn consulting: [Database Data Model][1]

# RESTful API

All the API used in this project are RESTful. Since it's an academic project, REST was used because it's recognized well defined standard for creating APIs. The status codes are the same from the HTTP protocol. You can learn more about they [here](https://www.restapitutorial.com/httpstatuscodes.html)

## Users

This section contains an explanation of each endpoint used to handle users. 

### Register a user

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

### Login a user

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

### View informations from a user

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

### Logout a user

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


## Authors

This section contains an explanation of each endpoint used to handle authors. 

### Add an author

```
Route: /authors
Method: POST
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    name: <string> // Author's name

On success:
    Status: 200
```

The return is something like this:
```json
{ "id": 3, "name": "Paula Fernandes" }
```

**Note**: if you add the same author twice, the first is returned.

### Get all authors

```
Route: /authors
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    

On success:
    Status: 200
```

The return is something like this:
```json
[
    {
        "id": 2,
        "name": "Zé Ramalho"
    },
    {
        "id": 1,
        "name": "Gustavo"
    }
]
```


### Get an author by its ID

```
Route: /authors/:id
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    

On success:
    Status: 200
    
On failure:
    Status: 401 // if ID is missing
    Status: 404 // If there's no author with that ID
```

**:id**: you must replace this by author's id.

The return is something like this:
```json
[
    {
        "id": 2,
        "name": "Zé Ramalho"
    },
    {
        "id": 1,
        "name": "Gustavo"
    }
]
```

### Get all authors from a music

```
Route: musics/:musicID/authors
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    

On success:
    Status: 200
    
On failure:
    Status: 401 // if music's ID is missing
```

**:musicID**: you must replace this by musics's id.

The return is something like this:
```json
[
    {
        "id": 2,
        "name": "Zé Ramalho"
    },
    {
        "id": 1,
        "name": "Gustavo"
    }
]
```

## Genres

This section contains an explanation of each endpoint used to handle genres. 

### Get all genres

```
Route: /genres
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    

On success:
    Status: 200
```

The return is something like this:
```json
[
    {
        "id": 2,
        "name": "Rock"
    },
    {
        "id": 1,
        "name": "Pop"
    }
]
```

### Get all genres from a music

```
Route: musics/:musicID/genres
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:
    

On success:
    Status: 200
    
On failure:
    Status: 401 // if music's ID is missing
```

**:musicID**: you must replace this by musics's id.

The return is something like this:
```json
[
    {
        "id": 2,
        "name": "Rock"
    },
    {
        "id": 1,
        "name": "Pop"
    }
]
```

## Musics

This section contains an explanation of each endpoint used to handle users. 

### Add a music

```
Route: /musics
Method: POST
Headers: 
    Content-Type: application/form-data

Body:
    name: <string> // Music's name
    author: <number> // First author ID
    author: <number> // Second author ID
    author: <number> // Nth author ID
    genre: <number> // First genre ID
    genre: <number> // Second genre ID
    genre: <number> // Nth genre ID
    music: <file> // Music's file

On success:
    Status: 201
    
On error:
    Status: 409 // If already there's a music with this name, authors and file extension.
    Status: 400 // If some field is missing. The error message contains the missing field.
```
### Get all musics

```
Route: /musics
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:

On success:
    Status: 200
    
On error:

```

**:id**: you must replace this by music's id.

The return from a successful request is something like this:
```json
[
    {
        "id": 3,
        "name": "Do Seu Lado",
        "url": "https://s3.amazonaws.com/miraculouswebsite/awsomefile.ogg",
        "posterURL": null,
        "duration": 1.128,
        "authors": [
            {
                "id": 47,
                "name": "Paula Fernandes"
            }
        ],
        "genres": [
            {
                "id": 0,
                "name": "Classical"
            }
        ]
    }, 
    {
        "id": 4,
        "name": "Earth",
        "url": "https://s3.amazonaws.com/miraculouswebsite/avangers.mp3",
        "posterURL": "https://s3.amazonaws.com/miraculouswebsite/poster.jpg",
        "duration": null,
        "authors": [
            {
                "id": 49,
                "name": "Sandy e Junior"
            }
        ],
        "genres": [
            {
                "id": 0,
                "name": "Classical"
            }
        ]
    }
]
```

### Get a music by ID

```
Route: /musics/:id
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:

On success:
    Status: 201
    
On error:
    Status: 401 // If you forgot to supply music's ID.
    Status: 404 // If there's no music with that ID.
```

**:id**: you must replace this by music's id.

The return from a successful request is something like this:
```json
{
    "id": 3,
    "name": "Do Seu Lado",
    "url": "https://s3.amazonaws.com/miraculouswebsite/awsomefile.ogg",
    "posterURL": "https://s3.amazonaws.com/miraculouswebsite/poster.jpg",
    "duration": 1.128,
    "authors": [
            {
                "id": 49,
                "name": "Sandy e Junior"
            }
        ],
    "genres": [
        {
            "id": 0,
            "name": "Classical"
        }
    ]
}
```

### Delete a music

```
Route: /musics/:id
Method: DELETE
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:

On success:
    Status: 200
    
On error:
    Status: 400 // If you forgot to supply music's ID or if the ID isn't a number.
    Status: 404 // If there's no music with that ID to be deleted.
```

## Favorites

This section contains an explanation of each endpoint used to handle favorites. 

### Add a favorite

```
Route: /favorites
Method: POST
Headers: 
    Content-Type: application/json
```

Body example:
```json
{ "userID": 2, "musicID": 20 }
```

On success:
    Status: 201
    
On error:
    Status: 401 // If some field is missing. The error message contains the missing field.




### Get all favorited musics from a user

```
Route: /favorites/:userID/
Method: GET
Headers: 
    Content-Type: application/json
```
    
On success:
    Status: 200
    
Body example
```json
[
    {
        "id": 18,
        "name": "Ana",
        "url": "https://storage.com/miraculous/46.ogg",
        "posterURL": null,
        "duration": null,
        "authors": [
            {
                "id": 46,
                "name": "Ana"
            }
        ],
        "genres": [
            {
                "id": 0,
                "name": "Classical"
            }
        ]
    },
    {
        "id": 19,
        "name": "Fogo",
        "url": "https://s3.amazonaws.com/miraculouswebsite/fire.ogg",
        "posterURL": null,
        "duration": null,
        "authors": [
            {
                "id": 47,
                "name": "Paula Fernandes"
            }
        ],
        "genres": [
            {
                "id": 5,
                "name": "Pop"
            }
        ]
    }
]
```
    
On error:
    Status: 401 // If some field is missing. The error message contains the missing field.

### Delete a favorite

```
Route: /favorites/:userID/:musicID
Method: DELETE
Headers: 
    Content-Type: application/json
```
    
On success:
    Status: 200
    
On error:
    Status: 404 // if there's no favorite do delete with that user and music id.
    Status: 401 // If some field is missing. The error message contains the missing field.


[1]: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Miraculous%20Database%20Model#R7V1tc9o4EP41zNx9aMcvmJiPgaRpm6SXCUnT3jcFC3BjLEYWAfLrT8aSsZFMzMXCJlGbyaD1i6TdR492V0Jp2f3p8gKD2eQaeTBoWYa3bNlnLcs6cVz6OxasEoHTZoIx9r1EZG4EA%2F8FMqHBpHPfg1HuRoJQQPxZXjhEYQiHJCcDGKNF%2FrYRCvK1zsAYCoLBEASi9MH3yCSRuo6xkX%2BF%2FnjCazYNdmUK%2BM1MEE2AhxYZkX3esvsYIZJ8mi77MIh1x%2FWSPPel4GraMAxDUuaBm9H56bk5uAZfhqZtmX7HvF5%2BspK3PINgzjp8H0EcsRaTFVdDtPCnAQhpqTdCIRmwKwYtDyd%2B4F2BFZrHzYgIGD7xUm%2BCsP9C7wcBvWRSAb2MCbOy1Ynf5gdBHwUIr%2BuxoRH%2Fzz05iN%2FI6sIwos%2Fe8D6bW6JrsMzdeAUiwluJggDMIv9x3e74wSnAYz%2FsIULQlN3Ee%2Fkl36jR%2Bh%2B9DgJ%2FHFLZkNYFMddF0huzTcuiTZiZniEmcJkRMRtdQDSFBK%2FoLeyqZbBH2ICx7G5SXmzgZ3YYpiZZ6LXbDPYM8uP03Wl1t3SIgHBMdZDWl76L13diCPXJqqPWy9UGAqqSEBDYQ%2FPQi7JQpB8yPd2I1gDdA6y2ANZvZy37NEYqxD7FmIDaCZjFH6lBCL2%2B6b3dI2jGjB7AEQcJZt2LPz9yYJgZwyf39mJr%2BpQjTpl46nve%2Bq1ZNIdoPVyiGRj64fgqqcVub0S3rLZYhOgrR8GaHib0ZTCMW4MIIOAxHWgz5IdkrW2nR3%2BoTfrGZ6fl0J72adnclOlPfDsmfRRGBAN%2FjUZIR8MCxiOi52E0u6P4h7y32UHtbAHbkgJ7J528jvZVHkWvgds2irGdg9m%2BmGoLmLq5fDOOHrOkIsFEWTjlsVMZdF5DR9xNBvz%2FiQO7AAfpPM3alpsKc%2FjIAMI%2BJB4cAQ8%2FwBQmLEP7QtRwjPE6KNYvO3KCOQChOCUJZXv6qgxAHQFAddNJgpyj5RKnAAKVcYkyKJwIUDifAj%2FQZHIsZOJaNZOJq8mkWjI5KYBA88mkKzqqIIoWCHuaT46FT0zDrZlQeFpNM0pVjNItAEHzGcU0q8eCJhC1BGK3yxGIqSo%2BNsWMsSaQNxGIWZQiroxBqgDD95vbP%2BPuy%2BXV7NvP0a%2FRP1%2BfxpEkWXKHnqhS9epBXasHTpsNx12rB10ZRkxXEUjEhMj9Pc%2Fbq3NaddZeCqidw%2FhNWXsZqKrI0kpbLGZWdNZ%2Br5lo50htdNZe2nIxTxIvYx9idVD7tlWRiixzLyOVKuIhaYvFDEvdlHI8nu3OUdno0Fjackma5Hw58zEgPgqZ6%2BJPqZ7AdPZX529NLc2mFlke%2F6DUoiLV8rG5JR2hR0gu4p4TTSDNJhBp4l4aRqvycE0x16IZ5G0M0i5AQaPybn9%2BOVF3Svti3n5%2FePi3s%2Fjx4HwSZ5PreeQPRUDovFvrMHm3die%2Fa9cu6XGYJ6owIubp9WbZ2tJuO0dxI9Nu0haLG7B12m2viWjnSG102k3actGR1ZtlD%2BPWVkMoh0y5SVusndqKuUS5T6sMCuIyIfXn4MC%2BhCtNKMdCKIdMtElbLC4MakJ5E6EoXxOsAgr4bvQASN85G9yPF8u7a3h%2FOZEEyTcoogHg1uYDWr1tGqlCNLc0lVtK5%2BCUIUoMqTW5lCWXnUO00eTybXH%2FYlm9Z%2FPMnV%2F9ePnpXK76ksjnbJ5bHdTcoo5bJHgpRzf77atVxS1SQOlIaD9uKc0ZeWwUD%2BbmREIKvvSl6UOta8K34B9ieVDaZL13qeK4R%2FneJWVQ4KbPYOEChhiKgNCrg63DrA66DnMvUnejZCjTtVSBRJ%2Bl0%2FTlwXQcH8%2F6oKVP01GyQHgUx%2BnIm67P02mUa7s%2FqdS%2BRmjpE3Wq5pOjOFJHvgNFQZ5EM4haBim7KKgsIrI1g1TMILZyBlEGBkcMj0%2FnhIamIiR0fFxTfFwyGa8sOnZ0dNz06NjZexqqPTp2dHSsYi5yjjc6dnR03Cjfdn9SqT06drRvWzWfHG907CjY%2FqgZRC2D1B4dO%2FqQ2aoZRPkps1WAQboVpiOYHnpjyP11qrUJGqMQBOcbKVX3PPSgx5S9uecKraERK%2FIPJGTFNAnmBMXBLpnyAJlqE69%2BZQu%2F45d9dnjxjIe4SWnFSklb4wbmdCwJRSM0x0O4o9%2F8TwtxCii6r2CrEIYBIP5zvh2VG6dbq3GMJhlnxzpZXdYR95v341yOH4p%2FTQlP0PRxThvQW0x8AgeU1uIrCwxmeeUX8oigxsLcygnninTvgXgioCuhGFcVxfCzUD4cjN2SME4c0NpgLM7%2BhzDP0iepdejnjHFoaWObuLDKGqreaaOsSa06LSr6d40kJtuumZfEpO8PQUHrpExOE9SHRE9wy7%2Fd4fKmefTCTJxM9fkBVoH23e1pgYe9GfW3ZbGrMvVLvkz%2BftXf4epujPolqciPo%2F523doXs3jvWPuuYTVK%2B5KEh3Z5CpUlicaK%2F25XXT4P3zL54YIMmXmKD2etzTxisPwVPItfUTikP9rmgWm6Xixu0j%2BoQyrZTS2Gzu9mUrA7%2BSnZcuueFT6UR%2BRszcn1q9%2Btl8E3pP07x9nqGbxTcoKtNalgfdRktMw8xSen1GYeyXFK4BlhyiT1Zn3oNJvjGfek3kmWr659DJZvW3ntm4aYdDsoy9uiI%2FiO1W%2B5Wy6mKW4fqkj9tIgRIplrF7RTk2vkwfiO%2FwA%3D
