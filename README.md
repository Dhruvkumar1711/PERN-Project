# User Management System

A full-stack **User Management System** built with **React, Express.js, Node.js, and PostgreSQL**.

This project implements basic user registration, login, profile updates, user listing, and user deletion. It was built to understand how a React frontend communicates with a REST API and how the backend interacts with PostgreSQL.

## Tech Stack

### Frontend
- React
- JavaScript
- Tailwind CSS
- Vite
- Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL
- `pg` PostgreSQL driver
- dotenv

## Features

- User registration
- User login
- Fetch all registered users
- Update user profile
- Delete user profile
- PostgreSQL connection pooling
- Parameterized SQL queries
- REST API endpoints
- CORS support
- Basic error handling
- Duplicate email/registration number handling

## Project Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RegistrationForm.jsx
│   │   └── ...
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── initDb.js
│   │
│   ├── models/
│   │   └── connection.js
│   │
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

> Folder names may differ depending on the project setup.

---

# API Endpoints

## 1. Health Check

```http
GET /
```

Checks whether the backend server is running.

### Response

```json
{
  "status": "Success",
  "message": "welcome to the User Management"
}
```

---

## 2. Get All Users

```http
GET /users
```

Fetches all users from the PostgreSQL database.

### Response

```json
{
  "status": "Success",
  "message": "All users Fetched",
  "data": []
}
```

---

## 3. Register User

```http
POST /users
```

Creates a new user.

### Request Body

```json
{
  "name": "John",
  "registration_no": "REG001",
  "email": "john@example.com",
  "password": "password123",
  "age": 21
}
```

### Successful Response

```json
{
  "status": "Success",
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John",
    "registration_no": "REG001",
    "email": "john@example.com",
    "age": 21
  }
}
```

### Duplicate User

If the email or registration number violates a PostgreSQL unique constraint, the API returns:

```http
409 Conflict
```

---

## 4. Login

```http
POST /login
```

Authenticates a user using their name and password.

### Request Body

```json
{
  "name": "John",
  "password": "password123"
}
```

---

## 5. Update Profile

```http
PATCH /profile
```

Updates the user's email, password, and/or age.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123",
  "newEmail": "johnnew@example.com",
  "newPassword": "newpassword123",
  "newAge": 22
}
```

The existing value is retained when a new value isn't provided.

---

## 6. Delete Profile

```http
DELETE /profile
```

Deletes a user based on their name.

### Request Body

```json
{
  "name": "John"
}
```

---

# Database

The application uses **PostgreSQL** as its database.

The backend uses the `pg` package and a connection pool:

```js
const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
});
```

### Connection Pooling

Connection pooling allows the application to reuse database connections instead of creating a new connection for every request.

This improves database resource usage and makes the application better suited for multiple requests.

---

# Environment Variables

Create a `.env` file in the backend:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

For the frontend, create:

```env
VITE_API_URL=http://localhost:3000
```

Do not commit `.env` files to Git.

Add this to `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

---

# Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

## 3. Configure PostgreSQL

Create a PostgreSQL database and configure the database credentials in the backend `.env` file.

Make sure PostgreSQL is running before starting the server.

## 4. Start Backend

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

## 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 6. Start Frontend

```bash
npm run dev
```

Vite will provide the local development URL, usually:

```text
http://localhost:5173
```

---

# Database Query Safety

The backend uses parameterized queries instead of directly inserting user input into SQL strings.

For example:

```js
const query = `
    SELECT * FROM users
    WHERE name = $1 AND password = $2;
`;

const result = await db.query(query, [name, password]);
```

Using `$1`, `$2`, etc. helps protect database queries from SQL injection caused by directly concatenating user input.

---

# Error Handling

The API uses `try/catch` blocks around asynchronous database operations.

Example:

```js
try {
    const result = await db.query(query);
} catch (error) {
    return res.status(500).json({
        status: "Failed",
        message: "Something Went Wrong",
        error: error.message
    });
}
```

PostgreSQL-specific errors are also handled where required.

For example, error code `23505` represents a unique constraint violation.

The application converts this into:

```http
409 Conflict
```

---

# CORS

The backend includes CORS handling so that the React frontend can communicate with the Express API during development.

The backend allows:

```text
GET
POST
PATCH
DELETE
OPTIONS
```

and handles browser preflight `OPTIONS` requests.

---

# Application Flow

```text
                React Frontend
                       |
                       | HTTP Request
                       ↓
              Express.js Server
                       |
                       ↓
                Route Handler
                       |
                       ↓
              PostgreSQL Query
                       |
                       ↓
              Connection Pool
                       |
                       ↓
                 PostgreSQL
                       |
                       ↓
                  API Response
                       |
                       ↓
                React Frontend
```

---

# What I Learned

Through this project, I worked with:

- React state management using `useState`
- Form handling in React
- Sending API requests using `fetch`
- REST API development with Express
- HTTP methods and status codes
- Express middleware
- CORS
- PostgreSQL integration with Node.js
- PostgreSQL connection pooling
- Parameterized SQL queries
- CRUD operations
- Async/await
- Error handling
- PostgreSQL constraints and error codes
- Environment variables
- Frontend-backend communication

---

# Future Improvements

The current project is primarily intended for learning full-stack development. The following improvements can be added for a more production-ready implementation:

- Password hashing using bcrypt or Argon2
- JWT/session-based authentication
- Authentication middleware
- Better input validation
- Proper user authorization
- Unique user IDs for profile operations
- Better login error handling
- Secure CORS configuration
- HTTPS in production
- Improved frontend form validation
- Loading and error states in the UI
- Database migrations
- Automated tests

---

# Security Note

This project currently demonstrates basic authentication and database operations for learning purposes.

For production use, passwords should **never be stored as plain text**. Password hashing, secure authentication, authorization, validation, and HTTPS should be implemented before deploying the application publicly.

---

# Author

**Dhruv Kumar**

B.Tech Computer Science & Engineering

---

## License

This project is intended for educational and learning purposes.
