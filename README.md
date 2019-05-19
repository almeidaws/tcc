
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
5. [Database Modeling](#database-modeling)

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

There's a folder named `dev` where you can create ReactJS Components and some other this that go on the frontend. This components are transpiled into `prod` folder. In the `prod` folder there's also some static html files that will be moved someday to out of that folder. In other words, the `prod` folder is an alias for the `build`/`public` folder.

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


## Authors

This section contains an explanation of each endpoint used to handle users. 

### Adding

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

### Getting all

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


### Getting by ID

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

### Getting from music

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

### Getting all

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

### Getting from music

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

### Adding

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
### Getting all musics

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
        "url": "https://s3.amazonaws.com/miraculouswebsite/awsomefile.ogg"
    }, 
    {
        "id": 4,
        "name": "Earth",
        "url": "https://s3.amazonaws.com/miraculouswebsite/avangers.mp3"
    }
]
```

### Getting by ID

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
    "url": "https://s3.amazonaws.com/miraculouswebsite/awsomefile.ogg"
}
```

### Deleting by ID

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

**:id**: you must replace this by music's id.

# Database Modeling

[Database modeling v1][3]\
[Database modeling v2][4]\
[Database modeling v3][5]\
[Database modeling v4][6]\
[Database modeling v5][7]\
[Database modeling v6][8]\
[Database modeling v7][1]\
[Database modeling v8][2]

[8]: https://bit.ly/2GjlpBL
[7]: https://bit.ly/2Gcvfph
[6]: https://bit.ly/2RZCvuS
[5]: https://bit.ly/2DNjxip
[4]: https://bit.ly/2Wvl3wR
[3]: https://bit.ly/2Tk0xNM

[2]: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Miraculous#R7V1bc5s4GP01ntl9aMeA8eUxdpJectlM3GyyfVOMbKsB5BFybefXrzCSDUi%2BNcjgRG0mgz7Q%2Feig70giNacXzL8QMBnfYA%2F6NbvuzWvOec22W26b%2FY4Ni8TgNrhhRJCXmKy1oY9eITfWuXWKPBhlHqQY%2BxRNssYBDkM4oBkbIATPso8NsZ%2FNdQJGUDL0B8CXrY%2FIo%2BPE2nbra%2FtXiEZjkbNV53cCIB7mhmgMPDxLmZyLmtMjGNPkKpj3oB%2B3nWiXJN7lhrurghEY0n0i3A0vzi6s%2Fg24HFiObaGmdTP%2FZCep%2FAb%2BlFf4IYIk4iWmC9EM0QwFPghZqDvEIe3zO3UWHoyR712DBZ7GxYgoGLyIUHeMCXplzwOf3bKYgd0mlPey3YxTQ77fwz4my3wcWI%2F%2FZ2L24xR5XgRGLO6dqLOVM92AeebBaxBRUUrs%2B2ASoedlueOIASAjFHYxpTjgD4laXmYLNVz%2BY%2FeBj0Yhsw1YXpCItkhqYzVYWO4T3k2%2FIaFwnjLxPvoCcQApWbBH%2BF27zqPwAWM7nSQ8W8PPanJMjdPQazQ47DnkR6u0V9ndsyECwhFrg1V%2Bq7REfq26lJ8qO9Z7mdyAz5okBBR28TT0ojQU2UWqpmvTEqAHgNWRwPrtvOacxUiFBDGMSagdg0l8yTqEsvvr2jtdiie80304FCAhvHrx9bMAhpXq%2BOTZbtybiHHEGTcHyPOWqabRHOLlcIkmYIDC0XWSi9NYm%2B55brEJsySH%2FpIexiwxGMalwRRQ8LwaaBOMQrpsbbfLflif9Oqf3ZrLatpjYWsdZj%2Fx44T2cBhRAtASjZCNhhmMR0TXI3jyg%2BEfitqmB7WbA7atBPZWOtmN9kUWRbvA7dQ3YzsDs0Mx1ZAwdXf1Zhw9p0lFgYl94ZTFTmHQ2YWOuJoc%2BH%2BIA2cDDlbvaV62zKswg48UIJxj4sGV8HALApiwDKsL1cMx9d2gWCZ24gRzBEJx9ySU%2FOurMAA1JQCVTScJck6WS9wNECiMS7RBoSVB4SIAyDdkcipk0rZLJpO2IZNiyaS1AQLVJ5OOPFEFUTTDxDN8cip8YtXbJROKkNUMoxTFKJ0NIKg%2Bo1hW8VgwBKKXQJzGfgRi6fKPLVkxNgTyJgKxNknEhTFIEWD4fnf%2Fa9R5vbqefPt3%2BDT85%2BvLKFKIJT%2FwC2tUs3pQ1upBo7nH6kFHhRGrrQkksiDy8CB0e32TVqPaKwG1dRi%2FSbVXgaoIlVZZYllZMar9QW%2BirSO10qq9suSyThIvYx9jddDMbYsiFZVyryKVIvwhZYllhaVsSjmdme3WUVlp11hZcoVMcjGfIAIowiGfuqCAtRMIJn81%2FzbUUm1qUen4R6UWHVLLx%2BaW1Qg9QXKR95wYAqk2gSiFe6UbrWuGa8lai2GQtzFIYwMKKqW7dS5Rm9xenfeDn1ceeL3q%2FUSOYiOkhAUYemfx9ud1b45pIHQ01jBk8cTbfRn4Lw58dkXwfJ6%2Beb4QoTmiTyINdp2KxULrSHFAxJF7gzdyhKdkILz3LRs%2FqBjwO6aZ0Mvs5N7aW66it4SNQJ9N837DTGG37Km9i3G7VuAcN6vAOUKBE0kk9eax1kCQEmrkNwK3cwklDSMl9Ae7bZUgk99StxLKlvpdBlpssOIXmCOSLdyyEkM3yimzMaKwzzglznNGwGTJHdPQg94uiB2gm9r5xnYlwm%2BoJgm6hrhM99b7bX0nr1ofsfV%2FPblRJ2Clt%2B6%2FPz7%2BbM5uH91P8nT9ZhqhgfzGNQsbKjRpWdjIHlNoHXNdQ4kRW8KIOY1Q2rrG1lFcyXUNZYnliZ1Z1zhopr91pFZ6XUNZcsUczJxGOIpuUAyhHHNNQ1lioxoUzCXaRQNtUJD3YbDOg33nCi4MoZwKoRxzJUNZYnnnhSGUNxGK9k0X2qCg4XCKYQ%2Bt7HHUZQxlkc0ei4LpQ%2FseC21QEF2fwsIXGBIoA8KIbLXjiGytRlZkE0sZu%2BiiY%2BvCiPnkR9VFttUwPh2VzTYf%2FdAis53EVz%2FURTef%2FajUzPZwUildabPNhz%2BK5pOT%2BPKHeh1Hg%2B5qGEQvg%2BwrrWlziBzDIAUziKOdQbSBwZW947MpZZ6pDAnjHpfkHluNPTehaPOPXeMfV90%2Fdg9%2BEZXuH7vGP9bxNnJP1z92jX9cqdnt4aRSun%2Fsmtlt0Xxyuv6xq2EbgWEQvQxSun%2Fsmq9hFs0g2j%2BHqQ0M4jjA28%2FArQKHnYET14WdgduqgaYPwW3b41yRQ3AtO%2Bcpt3M42PcQXKueSyg%2FxS3uEJwaZrIMUybMbF04cyuGH3dHt%2B%2BLn2Y%2BoVZOitGNH1mgecenKKXRKsJlneNrKvzWD9T8YlSX1vyyz%2FeOm1%2FimtKbX%2FayPlLz6yMfFlz%2F3bbkVbH%2B43fOxf8%3D

[1]: https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Miraculous#R7V1bc9o4GP01zOw%2BtINtzOUxkKSXXDYTmk22bwoWoMa2GFkUyK9fGUtgI3ErFrZbtZmM9dnW9ehI35Hk1JxeMP9EwGR8hz3o1%2By6N685lzXbbrlt9js2LBKD2%2BCGEUFeYrLWhj56h9xY59Yp8mCUeZBi7FM0yRoHOAzhgGZsgBA8yz42xH421QkYQcnQHwBftj4jj44Ta9utr%2B2fIRqNRcpWnd8JgHiYG6Ix8PAsZXKuak6PYEyTq2Deg35cd6Jekveut9xdZYzAkB7ywsPw6uLK6t%2BB64Hl2BZqWnfzD3YSy0%2FgT3mBnyJIIp5juhDVEM1Q4IOQhbpDHNI%2Bv1Nn4cEY%2Bd4tWOBpnI2IgsGbCHXHmKB39jzw2S2LGdhtQnkr2804NuT7PexjskzHgfX4f%2BbNfhwjT4vAiL37IMpsbZjuwDzz4C2IqMgl9n0widDrMt%2FxiwEgIxR2MaU44A%2BJUl5nMzVc%2FmP3gY9GIbMNWFqQiLpISmM1WFhuE95MPyGhcJ4y8Tb6BHEAKVmwR%2Fhdu85f4R3GdjpJeLaGn9XkmBqnoddocNhzyI9Wca%2BSe2RdBIQjVger9FZxifRadSk9VXKs9TKpAZ9VSQgo7OJp6EVpKLKLVEnXpiVAjwCrI4H1y2XNuYiRCgliGJNQOwaT%2BJI1CGX316V3uhRPeKP7cChAQnjx4utXAQwr1fDJs924NRHjiAtuDpDnLWNNoznEy%2B4STcAAhaPbJBWnsTY98tRiE2ZRDv0lPYxZZDCMc4MpoOB11dEmGIV0Wdtul%2F2wNunVP7o1l5W0x8LWOsx%2B4scJ7eEwogSgJRoh6w0zGPeIrkfw5BvDPxSlTXdqdwPYthLYO%2BlkP9oXWRTtA7dT347tDMyOxVRDwtTDzck4ek2TigITh8Ipi53coLMPHXExOfB%2FEQfOFhysxmmet8xQmMFHChDOOfHgSni4BwFMWIaVherhmPp%2BUCwjqzjBnIFQ3AMJZXP4yg1ATQlARdNJgpzKcom7BQK5cYk2KLQkKFwFAPmGTKpCJm27YDJpGzLJl0xaWyBQfjLpyBNVEEUzTDzDJ1XhE6veLphQhKxmGCUvRulsAUH5GcWy8seCIRC9BOI0DiMQS5d%2FbMmKsSGQkwjE2iYR58YgeYDh68Pjj1Hn%2FeZ28uXf4cvwn89vo0ghlnzDb6xSzepBUasHjeYBqwcdFUastiaQyILI05PQ7fVNWo1qrwTUzm58kmqvAlUeKq0yx7KyYlT7o0ainT211Kq9MueyThIvY59jddDMbfMiFZVyryKVPPwhZY5lhaVoSqnOzHZnryy1a6zMuUImuZpPEAEU4ZBPXVDA6gkEk7%2BafxtqKTe1qHT8s1KLDqnlz%2BaWVQ%2BtILnIe04MgZSbQJTCvdKN1jXDtWStxTDIaQzS2IKCUulunWvUJvc3l%2F3g%2B40H3m9635Gj2AgpYQGG3kW8%2FXndmmMaCB2NVQxZvPB6Xwb%2BiwMfXRG8nKdvXi5EaI7oi4iDXafeYqH1S3FAvCO3Bq%2FkCE%2FJQHjvOzZ%2BUNHh90wzoZfZyb2ztVxFawkbgT6b5v2Emczu2FP7EON2rcA5blaBc4QCJ6JIys3fWgNBiqixuRG4vRFRUjFSRL%2Bw21YJMnmUupdQttTvMtBinRW%2FwQ0i2cEtKzF0q5wyGyMK%2B4xT4jRnBEyW3DENPejtg9gRuqm9WdmuRPgN1SRBVxeX6d76fWvf2VStz1j7P17cqBOw3FuPX5%2Bfvzdn98%2FuB3m6fjeN0EAecc3ChgpNWhY2sscUBMvunZDtOhVxEkZsCSPmNEJh6xo7e3Ep1zWUOZYndmZd46iZ%2Fs6eWup1DWXOFXMwcxrhLLpBPoRyzjUNZY6NapAzl2gXDbRBQd6HwRoP9p0buDCEUhVCOedKhjLH8s4LQygnEYr2TRfaoGDJjDLBEfMADadUilMOXtzQhyTDKjmzilVdWtFw5s0QiF4CUZ1K0LU6qsyy2bqVM39o37qlDQqi6VNY%2BARDAmVAGO2%2Bdh7tvtX4Ne2%2BY%2BvCiPmSUNm1%2B1U3ro54b5tvCWlR7yvxMSF11s3XhEo1sz2eVAoX8G3zPaG8%2BaQSHxRSLw9rWM4xDKKXQQ5V7LU5RI5hkJwZxNHOINrA4Mre8cWUMs9UhoRxjwtyj63GgWf2tfnHrvGPy%2B4fu0cPRIX7x67xj3WMRm51%2FWPX%2BMelmt0eTyqF%2B8eumd3mzSfV9Y9dDfsIDIPoZZDC%2FWPXfGQ3bwbR%2FpVdbWAQp4xOP1q7Chx3tFZc53a0dqcGmj5bu2u7c0nO1rbsDU%2B5vYGDQ8%2FWtuobEW1OcfM7W6uGmSzDFAkzWxfOxHCwF2div1pZgObuwcehQGs2CwaarOT8xqe4pW4twkWdI24qHNw%2FqPpF9y%2Bs%2BmXn8Deu%2FuYmaRVe%2FbI79idVvz7yYcH1341Mhor1H990rv4H
