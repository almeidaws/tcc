

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
    6. [Listenings](#listenings)
        1. [Add a listening](#add-a-listening)
        2. [Get last listened musics](#get-last-listened-musics)


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
Route: /musics[?userID=2]
Method: GET
Headers: 
    Content-Type: application/x-www-form-urlencoded

Body:

On success:
    Status: 200
    
On error:

```

**:userID**: if you optionally pass the user's id as a query parameter, the result will have a boolean property
name `favorited` that will tell you if the use has favorited that music or not.

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

On success:
    Status: 201
    
On error:
    Status: 401 // If some field is missing. The error message contains the missing field.
```

The returned body is something like this:
```json
{ "userID": 2, "musicID": 20 }
```


### Get all favorited musics from a user

```
Route: /favorites/:userID/
Method: GET
Headers: 
    Content-Type: application/json

    
On success:
    Status: 200
    
On error:
    Status: 401 // If some field is missing. The error message contains the missing field.
```
    
The returned body on success is something like this:
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

### Delete a favorite

```
Route: /favorites/:userID/:musicID
Method: DELETE
Headers: 
    Content-Type: application/json
    
On success:
    Status: 200
    
On error:
    Status: 404 // if there's no favorite do delete with that user and music id.
    Status: 401 // If some field is missing. The error message contains the missing field.
```

## Listening

This section contains an explanation of each endpoint used to handle listenings.
A listening occurs when someone (user or not) listen a music. This information is used
after to present last listened musics on the website.

### Add a listening

```
Route: /listenings
Method: POST
Headers: 
    Content-Type: application/json
    
Body example:
{ "musicID": 5 }

On success:
    Status: 201
    
On error:
    Status: 401 // If some field is missing. The error message contains the missing field.
```

### Get last listened musics

```
Route: /listenings[?userID=2]
Method: GET
Headers: 
    Content-Type: application/json

On success:
    Status: 200
```

The returned body on success is something like this:
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


[1]: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Miraculous%20Database%20Model#R7V1tU%2BI6FP41zNz7wZ2%2BUCwfBV3dVXcd0dW93yINtFoapg0C%2FvqbQgItCbVI0xbN7s4OTUubnPPkyTlPjrVhdkez8xCM3WvkQL9haM6sYZ42DOPYssn%2FccN82aC3mrRlGHoObVs39Lw3SBs12jrxHBilLsQI%2Bdgbpxv7KAhgH6faQBiiafqyAfLTTx2DIeQaen3g860PnoPdZattaev2C%2BgNXfZkXaNnRoBdTBsiFzhommgyzxpmN0QILz%2BNZl3ox8Zjdll%2B7%2FuWs6uOhTDAeb5wMzg7OdN71%2BB7XzcN3Wvp17MjY3mXV%2BBP6IDvIxhGtMd4zswQTb2RDwJy1BmgAPfoGY0c913Pd67AHE3ibkQY9F%2FYUcdFofdGrgc%2BOaWTBnI6xNTLRiu%2Bm%2Bf7XeSjcPEcE2rx39Q3e%2FEd6bNCGJHv3rAx6xtN12CWuvAKRJj1Evk%2BGEfe06Lf8RdHIBx6QQdhjEb0IjbK7%2BlODRZ%2FyHnge8OAtPXJs2DIbLEcjd4kx7xPqJteYYjhLNFEfXQO0QjicE4uoWcNjX6FzhjDbC%2BPp2v46S2KKTcJvWaTwp5Cfri69%2Bpxt2SKgGBIbLB63upe7HnHGvc80eOI91JPAz4xSQAw7KBJ4ERJKJIPiZGumxYA3QGsJgfWH6cN8yRGKgw9gjEOtS4Yxx%2BJQzA5vx692cFoTJ3uwwEDSUiHF39%2BYsDQE45fXtuJvekRjjihzSPPcRZ3TaI5QIvpEo1B3wuGV8unmM110y19WtyEyC0H%2FoIeXHIzGMS9QRhg8LSaaGPkBXhhbatD%2FhGfdLVvVsMiI%2B2SY319TP7Fl4e4i4IIh8BboBGS2TCF8YzoOCEa3xH8Qzba5KS2NoBtCIGdSSfvo32eRtF74Da17dhOwWxXTDU5TN1c7o2jpySpCDCRF05p7BQGnffQEQ%2BTAv%2BDODC34GC1TtO%2BpZbCFD4SgDDLxIPF4eEXGMEly5CxYDkco70PisXNDpxgSiAUKyehbC5fhQGoxQGoajpZIudgucTaAoHCuEQaFI45KJyNgOcrMjkUMrGNisnEVmRSLJkcb4FA%2FcmkzQeqIIqmKHQUnxwKn%2BiaXTGhMFlNMUpRjNLeAoL6M4quF48FRSByCcRs5iMQXVZ%2BrPOKsSKQvQhE3yYRF8YgRYDh583t87D9dnk1%2FvFn8Dj4ffEyjARiyR16IUZVuwdV7R5YTTods3YP2iKM6LYkkPCCyP090%2B3lBa1KtRcCKnMa76Xai0BVhEor7DGvrCjVfqeVKHOm1lq1F%2Fac10nibewydgdVbFsUqYiUexGpFJEPCXvMKyxVU8rhRLaZs7LWqbGw5wKZ5Gw29kKAPRTQ0MUbETuB0fif1r%2BKWupNLSIdv1RqkSG1fG1uWc3QAyQXvuZEEUi9CUQo3AvTaFkRrs5rLYpB9mOQ5hYU1Ep3e360ovaIjEW%2F%2Ffnw8F9r%2BuvBOuJXk%2BtJ5PV5QCjdrVGO7tZspat2zZwRh34sCyO8Tq%2BKZSuT3TJncS1lN2GP%2BQJsJbvttBBlztRay27CnvOBrCqWLSesLYZQypTchD1WQW3BXCI9ppUGBX6bkMRzsGdewrkilEMhlDKFNmGP%2BY1BRSh7EYr0PcEioBDeDR4A7lqnvfvhdHZ3De8vXUGSfIMikgBuFB%2BQx5u6tjKI4pa6cktuDU4aoviUWpFLXnLJnKK1Jpcf0%2Fs3w%2Bi86qf25OrX2x%2Frct4VZD6nk9TuoOKWg%2BIWUV2tLG4RAkplQh%2FnlswZWmtuEaJXwg99KfqQSx%2BsBL%2BM7UFhl1XtUsF5j%2FTaJWlQYK5PYOEcBiHkAaF2Bxvl7A7aFl2NVuFGzlSmbcgCiXqXTt23B1fz%2BHD2Bw31Nh0pG4QH8TodcdfV%2B3RqFdruTiqV7xEa6o06RfPJQbxSR1yBIkEnUQwil0HybgpKy4hMxSAFM4gpnUGkgcHi0%2BOTCSapKQ8JlR9XlB%2FnFOOlZceWyo7rnh1bOy9DlWfHlsqOZaxF1uFmx5bKjmsV2%2B5OKpVnx5aKbYvmk8PNji0J5Y%2BKQeQySOXZsaVeMls0g0h%2Fy2wRYBBWzbQ410NnCFm8TqzmoiEKgH%2B2biXmngQOdKix19dcoQU0YkM%2BQ4zn1JJgglGc7OIRS5CJNcP5Y%2FLgb3yzbxY7PGUp7vJoTo94d1ArR2gS9mHGMNlvEmIzftt1NGKPbZA5l0PoA%2By9wlQvCndOu1LnaBU6J3NbrCbe4evNu7GW4wX8b1MKXTR6mpAOdKauh2GP0Fp8ZhqCcdr4W42YX1s5Zlyxqj3g3whoCyjGlkUx7F0onx3Gdk4Ys3izLjDmV%2F8y3DPz8Mo75HPCOeRo7Zv4YJ50VKnLRl6XGrXyKB%2Ff1ZKYTLNiXuJF31%2BcgRaiTMoSJIZEL3Ajvs0IeVc6%2BlYlTmT69AQrwPr25rLAaChh%2FqYod5VmfsEPk39e87eYuWtjfoEU%2BXXM36za%2BryK94mtb2tGrawvEDxUyMNsI8jGsn5NV01iHpYbfvYkQ%2BSerHex1sU9fLJ8AV75H1EoMx5tssR0tV%2FMF%2BmXGpAKqqn51PnTLApmK70kG3bVq8KXioisjTW5evPb1TL4mrT%2Fpji7cAZv5Vxg6yUqGF9EjBa5J%2BtFKXVxj%2BB1SuAVhYRJqlV9yDKb4hn7uNpFlu2ufQ2Wbxpp6%2BsaL7qVyvImHwh%2BYvMb9kaIqfPlQ7LMbxrnF%2FPHcb%2FZ%2B3l%2B9Nt97lxO7kSa55UXYRh4wZBzg6qH3qEeWrD3z0FnuzzVbqVwcqQbfDQmrBJpGbKQwi8oDy7c%2FF0Y%2BI1Hjao3%2Bni90TsoypjTe5dBF1GkJu6fekffbvVGucuI8oCjJQZHCRWLwv4YfPilGKTmDMJqHMuoWBSDRv02neoYpMKKRXF%2FKlb6P6ITbYgE7yoT4oFT0L%2BrTJQlRIh7aVXrno%2FoRNLcs9OSXJJ%2FDI5Lb3wwJ8bfUyXaKwGydC4B4sNWWTqR2E6HtkO%2FXwJq6Rv21%2Fiq0VKVCoPPGuq9GbYn%2Fs2U%2FfmdyIKMTw5DhHDi3DkZknuNHBhf8T8%3D
