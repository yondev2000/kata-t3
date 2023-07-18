# kata-t3

### Prerequisites:

1. Install Node.js:
- Visit the official Node.js website (https://nodejs.org) and download the latest stable version of Node.js.
- Follow the installation instructions for your operating system.


2. Initialize the project:
- Open your terminal or command prompt.
- Navigate to the project directory.
- Run the following command to initialize the project and create the package.json file:
``
npm init
``

## User Management API

API endpoints for managing users.

## Authentication
All API endpoints except for the `/login` endpoint require authentication using a JWT token. To authenticate, include the JWT token in the Authorization header as follows:

```json
Authorization: Bearer <token>
```

## Login
**Request**
- Method        : POST
- URL           : `/login`
- Content-Type  : application/json
- Body          :

```json
{
  "username": "string",
  "password": "string"
}
```

**Response**
- Status: 200 OK
- Content-Type: application/json
- Body:
```json
{
  "token": "string"
}
```

**Error Responses**
- Status: 401 Unauthorized
- Body:
```json
{
  "message": "Invalid username or password"
}
```

## Get All Users
**Request**
- Method: GET
- URL: `/users`

**Response**
- Status: 200 OK
- Content-Type: application/json
- Body: Array of user objects
```json
[
    {
        "id": 1,
        "username": "user1",
        "password": "password1"
    },
    {
        "id": 2,
        "username": "user2",
        "password": "password2"
    }
]
```

## Get User by ID
**Request**
- Method: GET
- URL: `/users/{id}`
- URL Parameters:
- - id: User ID (integer)

**Response**
- Status: 200 OK
- Content-Type: application/json
- Body: User object

**Error Responses**
- Status: 404 Not Found
- Body:
```json
{
  "message": "User not found"
}
```


## Create User
**Request**
- Method: POST
- URL: `/users`
- Content-Type: application/json
- Body: User object
```json
{
    "id": 3,
    "username": "user3",
    "password": "password3"
}
```

**Response**
- Status: 201 Created
- Content-Type: application/json
- Body: Created user object
```json
{
    "id": 3,
    "username": "user3",
    "password": "password3"
}
```

## Update User
**Request**
- Method: POST
- URL: `/users/{id}`
- URL Parameters:
- - id: User ID (integer)
- Content-Type: application/json
- Body: Updated user object
```json
{
    "username": "user3",
    "password": "password3"
}
```

**Response**
- Status: 200 OK
- Content-Type: application/json
- Body: Updated user object

**Error Responses**
- Status: 404 Not Found
Body:
```json
{
  "message": "User not found"
}
```

## Delete User
**Request**
- Method: DELETE
- URL: `/users/{id}`
- URL Parameters:
- - id: User ID (integer)
- Content-Type: application/jso

**Response**
- Status: 200 OK
- Content-Type: application/json
- Body: Deleted user object
```json
{
    "id": 1,
    "username": "user1",
    "password": "password1"
}
```

**Error Responses**
- Status: 404 Not Found
- Body:
```json
{
  "message": "User not found"
}
```

