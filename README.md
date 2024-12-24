# terralogic_task

CRUD Application for E-Book

# Books API

This is a simple RESTful API for managing a collection of books. The API supports basic CRUD operations, storing data in a MongoDB database. It is built using Node.js with Express.js for routing and handling HTTP requests.

## Features

- Add a new book
- Retrieve all books
- Retrieve a single book by ID
- Update a book by ID
- Delete a book by ID
- Input validation and error handling

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Balaji6245/terralogic_task

cd E-Book

npm install

## To start a server run this command
npm run serve

```

## Environment file keys

PORT = YOUR PORT
NODE_ENV = "production"
DB_STRING = MONGODB URL
SECRET_KEY = JWT SECRET KEY

## HTTP end points for authentication

Create a user or admin:

http://localhost:{PORT}/api/v1/auth/register (POST)

Request Boady Like:

{
"password": "Test@1234",
"email": "morgan1@gmail.com",
"name": "Morgan Housel"
}

Login registed user or admin:

http://localhost:{PORT}/api/v1/auth/login (POST)

Request Boady Like:

{
"password": "Test@1234",
"email": "morgan1@gmail.com"
}

Forget Password:

http://localhost:{PORT}/api/v1/auth/forget_password (PATCH)

Request Boady Like:

{
"new_password": "Test@1234",
"email": "morgan1@gmail.com"
}

## HTTP end points for books

Authentication:

This API requires a JWT (JSON Web Token) for access to all endpoints. You must include the token in the request headers as a Bearer Token.

## Steps to Use JWT Token in Postman:

Open Postman.

Select the endpoint you want to test (e.g., POST /books, GET /books).

Go to the Authorization tab.

Set the Authorization Type to Bearer Token.

Paste your JWT token into the Token field.

Example
If you're using Postman, your request headers should include:

Authorization: Bearer your-jwt-token

Create book:

http://localhost:{PORT}/api/v1/books/ (POST)

Request Boady Like:

{
"title": "Same as Ever",
"author": "Morgan Housel",
"description": "24 short stories about the ways that life, behaviour, and business will always be the same.",
"price": 499,
"volume": "I",
"isbn": "9781804091050",
"published_on": "2023-11-07T09:56:19.966+00:00"
}

Get book:

http://localhost:{PORT}/api/v1/books/{bookId} (GET)

Get books:

http://localhost:{PORT}/api/v1/books/ (GET)

Update book:

http://localhost:{PORT}/api/v1/books/{bookId} (PATCH)

Delete book:

http://localhost:{PORT}/api/v1/books/{bookId} (DELETE)
