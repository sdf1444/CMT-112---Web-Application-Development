# CMT112-CW2-Library Server

## Installation

Download and install all requirements for the server with:

```
npm install
```

## Initialising a Database

Before you run the server for the first time, you should ensure there is a database available for it to read and write to. You can initialise the database with:

```
node initialise_database.js
```

This will create a `library.sqlite` file inside the `data/` directory and pre-populate it with some sample data.

**CAUTION!** Running this command will remove any data already stored in the database `data/library.sqlite`. It should be used with caution, only when you want to reset the Database to its initial state.

## Running the Server

Start the server with:

```
node server.js
```

This will start the server running on `127.0.0.1` port `3000`.

## Check everything is working correctly

To check the database and server are operating correctly you can open `http://127.0.0.1:3000/authors` in a Web Browser. This should return a JSON representation of all the Authors stored in the database.

## Making requests

Requests to the server can be made to the endpoints specified in `server.js`. For details on the Models and the Fields they contain, check `data.js`

### `authors/...`

**GET /**

Returns a list of all Authors in the database. If requested with the parameter `allEntities`, Author objects returned will include full details of all Books authored by each Author, otherwise only `bookID`s will be provided

Accepted query parameters: `allEntities`

```
GET http://127.0.0.1/authors
GET http://127.0.0.1/authors?allEntities=true
```

**GET /:authorID**

Returns the Author with the specified `authorID`. If requested with the parameter `allEntities`, Author object returned will include full details of all Books authored by this Author, otherwise only `bookID`s will be provided

Accepted query parameters: `allEntities`

```
GET http://127.0.0.1/authors/1
GET http://127.0.0.1/authors/1?allEntities=true
```

**PUT /:authorID**

Updates the Author with the specified `authorID`. Fields to be updated should be included as the body of the PUT request.

Accepted body fields: `name`

```
PUT http://127.0.0.1/authors/1
{"name" : "Dave"}
```

**DELETE /:authorID**

Deletes the Author with the specified `authorID`

```
DELETE http://127.0.0.1/authors/1
```

**POST /**

Creates a new Author. Fields for the Author should be included as the body of the POST request

Accepted body fields: `name`

```
POST http://127.0.0.1/authors
{"name" : "Dave"}
```

**POST /:authorID/books**

Adds a Book to the list of books written by the Author with the specified `authorID`. Will create the Book if a Book with matching details is not found. Fields for the Book should be included in the body of the POST request

Accepted body fields: `bookTitle`, `bookISBN`

```
POST http://127.0.0.1/authors/1/books
{
    "bookTitle": "Building Library Systems",
    "bookISBN": "3985789305"
}
```

**POST /:authorID/books/:bookID**

Adds the Book with the specified `bookID` to the list of books written by the Author with the specified `authorID`

```
POST http://127.0.0.1/authors/1/books/1
```

### `books/...`

**GET /**

Returns a list of all Books in the database. If requested with the parameter `allEntities`, Book objects returned will include full details of all Authors of each Book, otherwise only `authorID`s will be provided

Accepted query parameters: `allEntities`

```
GET http://127.0.0.1/books
GET http://127.0.0.1/books?allEntities=true
```

**GET /:bookID**

Returns the Book with the specified `bookID`. If requested with the parameter `allEntities`, Book objects returned will include full details of all Authors of this Book, otherwise only `authorID`s will be provided

Accepted query parameters: `allEntities`

```
GET http://127.0.0.1/books/1
GET http://127.0.0.1/books/1?allEntities=true
```

**PUT /:bookID**

Updates the Book with the specified `bookID`. Fields to be updated should be included as the body of the PUT request.

Accepted fields: `title`, `isbn`, `author`

```
PUT http://127.0.0.1/books/1
{
    "title": "Building Library Systems",
    "isbn": "3985789305"
    "author": "Spencer Du
}
```

**DELETE /:bookID**

Deletes the Book with the specified `bookID`

```
DELETE http://127.0.0.1/books/1
```

**POST /**

Creates a new Book. Fields for the Book should be included as the body of the POST request

Accepted fields: `title`, `isbn`, `author`

```
POST http://127.0.0.1/books
{
    "title": "Building Library Systems",
    "isbn": "3985789305",
    "author": "Spencer Du"
}
```
### `users/...`

**GET /**

Returns a list of all Users in the database

```
GET http://127.0.0.1/users
```

**GET /:userID**

Returns the User with the specified `userID`

```
GET http://127.0.0.1/users/1
```

**POST /**

Creates a new User. Fields for the new User should be included in the body of the POST request.

Accepted body fields: `name`, `barcode`, `memberType`

```
POST http://127.0.0.1/users
{
    "name": "Sarah",
    "barcode": "39587985",
    "memberType": "Student"
}
```

**PUT /:userID**

Updates the details of the User with the specified `userID`. Fields to be updated should be included in the body of the PUT request

Accepted body fields: `name`, `barcode`, `memberType`

```
PUT http://127.0.0.1/users/1
{
    "name": "Sarah",
    "barcode": "39587985",
    "memberType": "Student"
}
```

**DELETE /:userID**

Deletes the User with the specified `userID`.

```
DELETE http://127.0.0.1/users/1
```

**GET /:userID/loans**

Returns the list of Loans for the User with the specified `userID`.

```
POST http://127.0.0.1/users/1/loans
```
### `loans/...`

**GET /**

Returns a list of all Loans in the Database

```
GET http://127.0.0.1/loans
```

**GET /:loanID**

Returns the details of the Loan with the specified `loanID`

```
GET http://127.0.0.1/loans/1
```

**PUT /:loanID**

Updates the details of the Loan with the specified `loanID`. Fields to be updated should be included in the body of the PUT request

Accepted body fields: `user`, `book`, `dueDate`

```
GET http://127.0.0.1/loans/1
{

"user": Martin Chorley
"book": "Laughing for No Reason"
"dueDate": "2018-12-31"

}
```
**DELETE /:loanID**

Deletes the Loan with the specified `loanID`

```
DELETE http://127.0.0.1/loans/1
```
### `exams/...`

**GET /**

Returns a list of all past exam papers in the Database

```
GET http://127.0.0.1/exams
```

**GET /:examID**

Returns the details of the past exam paper with the specified `examID`

```
GET http://127.0.0.1/exams/1
```

**PUT /:examID**

Updates the details of the past exam paper with the specified `examID`. Fields to be updated should be included in the body of the PUT request

Accepted body fields: `title`, `module`, `course`, `link`

```
GET http://127.0.0.1/exams/1
{

"title":
"module":
"course":
"link":

}
```
**DELETE /:examID**

Deletes the past exam paper with the specified `examID`

```
DELETE http://127.0.0.1/exams/1
```


## journals/...

**GET /**

Returns a list of all Journals in the Database

```
GET http://127.0.0.1/journals
```
**PUT /:journalID**

Updates the details of the Loan with the specified `loanID`. Fields to be updated should be included in the body of the PUT request

Accepted body fields: `title`, `journal`, `issn`

GET http://127.0.0.1/journals/1
{

"title":
"journal": 
"issn":

}

```
**POST /**

Creates a new journal. Fields for the new Journal should be included in the body of the POST request.

Accepted body fields: `title`, `journal`, `memberType`

```
POST http://127.0.0.1/journals
{
    "title":
    "journal":
    "issn":
}
```


**DELETE /:journalID**

Deletes the Journal with the specified `journalID`

```
DELETE http://127.0.0.1/journals/1
```

### `/search`

**GET /**

Searches for a particular item in the database. Parameters are used to control what type of item being searched for and to supply fields to match.

Parameters accepted: `type` + [`title`, `isbn`, 'author'] + [`name`] + [`name`, `barcode`, `memberType`] + [`title`. `journal`, `issn`] + [`title`, `module`, `course`, `link`] + [`user`, `book`, `dueDate`]

```
GET http://127.0.0.1/search?type=book&title=javascript
GET http://127.0.0.1/search?type=author&name=david
GET http://127.0.0.1/search?type=user&barcode=3265897236
GET http://127.0.0.1/search?type=journal&journal=bmj
GET http://127.0.0.1/search?type=exam&module=CMT-112
GET http://127.0.0.1/search?type=loan&user=Martin Chorley
```

## Editing the server

The Node server uses the [Sequelize](http://docs.sequelizejs.com/) library for interacting with the SQLite database.

It uses the [Express](https://expressjs.com/) framework for running the web server and routing queries.

## Server Test Page

This repository also contains a server test page - `server_test.html`. This can be used both to check the server is operating correctly and to act as an example of how to make requests to the server.
