# Nalanda Library Management System

A comprehensive backend system for library management built with Node.js, Express, MongoDB, and GraphQL.

## 🚀 Features

### User Management
- User registration with name, email, and password
- JWT-based authentication with encryption/decryption
- Role-based access control (Admin & Member roles)
- Secure user login system

### Book Management
- Add, update, and delete books (Admin only)
- View books with pagination and filtering
- Book details include title, author, ISBN, publication date, genre, and copies
- Search and filter by genre, author, and other criteria

### Borrowing System
- Book borrowing functionality for members
- Book return system
- Borrowing history tracking

### Reports & Analytics
- Most borrowed books report
- Active members analysis

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API + GraphQL API
- **Authentication**: JWT with encryption
- **Validation**: Zod
- **Security**: bcrypt for password hashing
- **Documentation**: Postman

### Additional Technologies
- **GraphQL**: Apollo Server
- **Version Control**: Git/Github

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Nalanda-Book-Management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=5000

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/nalanda-library
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   JWT_ENCRYPTION_KEY=your-32-char-encryption-key
   
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your local machine or update the connection string for a remote database.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 🔗 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Book Management Endpoints
- `GET /api/books/list` - Get all books (with pagination & filtering)
- `POST /api/books/add` - Add new book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Borrowing Endpoints
- `POST /api/borrow` - Borrow a book
- `PUT /api/borrow/return/:id` - Return a book
- `GET /api/borrow/history` - Get borrowing history

### Reports Endpoints
- `GET /api/borrow/most-borrowed-books` - Most borrowed books
- `GET /api/borrow/active-members` - Most active members

## 🔍 GraphQL API

Access the GraphQL playground at: `http://localhost:5000/graphql`

### Sample Queries

**Get all books:**
```graphql
query {
  listBooks(limit: 10, offset: 0) {
    id
    title
    author
    genre
    stock
  }
}
```

**Borrow a book:**
```graphql
mutation {
  borrow(bookId: "book_id_here") {
    id
    borrowedDate
    returnedDate
    bookId
  }
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
- Tokens are encrypted using AES-256-GCM
- Include user ID and role information
- Expire after 7 days (configurable)

### Role-based Access
- **Admin**: Full access to all endpoints
- **Member**: Limited access (cannot manage books, only borrow/return)

## 📊 Aggregation Queries

The system uses MongoDB aggregation pipeline for complex reports:

1. **Most Borrowed Books**: Groups borrowing records by book and counts
2. **Active Members**: Aggregates borrowing history by user
   

## 📁 Project Structure

```
nalanda-library-system/
├── src/
│   ├── controllers/         # Route controllers
|   ├── container/          # Dependency resolver and registry
|   ├── interfaces/         # Interfaces and types
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── routes/             # Express routes
|   ├── service/            # Service logics
|   ├── repositories/       # Database operations
│   ├── graphql/            # GraphQL schema and resolvers
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   └── server.js           # Express app setup
├── .env.example           # Environment variables example
├── package.json           # Dependencies and scripts
└── README.md              # This file
```
