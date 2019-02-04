
# Miraculous
Miraculous is a website project created to study music recommendations algorithms. It's created using NodeJS technology on the server side and ReactJS on the client side. 

The creators are:
- [Gustavo Almeida](https://github.com/almeidaws/)
- [Renan Alves](https://github.com/RenanAlvesBCC)

# Index

[Documentation Guide](#documentation-guide)
1. [How to perform queries on the database](#how-to-perform-queries-on-the-database)
	1. [Registering a user](#registering-a-user)


# Documentation Guide

This section contains a bunch of mini guides that you can use to do specific tasks. It isn't an exhaustive documentation. That
documentation can be found on the documentation comment above each declaration on the source code.

Currently there's no final domain used on this project, so when you see `miraculous.com` replace this by the current website's domain.

## How to perform queries on the database

The current database is PostgreSQL. But it's no visible on client side. To indirectly use it, you should make requests to the routes created to perform queries on the database, among other things.

### Registering a user

To register a user you should use the route `miraculous.com/user/register`. And pass the following information:

- User's name: current user's name. Example: Gustavo Amaral.
- User's email: current user's email. This value is validated, so something like `gustavo@.com` won't work.
- User's password: current user's password. You don't need to worry. This value is hashed before it's stored on the database.

**Example**:

    name: Gustavo Amaral
    email: gustavo@gmail.com
    password: 12345

You should use the `POST` method to do the request and pass the data on the request's body. The request should be of type `application/x-www-form-urlencoded`. Otherwise the requisiton will fail.

If the requisiton is successfuly performed, it returns just an `200` status code. If there's an error, it returns an non `200` status code. Currently there's no a elegant way to handle error on this route.

