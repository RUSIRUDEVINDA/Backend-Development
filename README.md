# 🎬 Movie Watchlist Backend API

A robust RESTful API built with Node.js and Express for managing movies and user watchlists. This project demonstrates modern backend development practices, including secure authentication, input validation, and ORM integration using PostgreSQL.

## 🚀 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens) & Cookies
- **Validation**: [Zod](https://zod.dev/)
- **Security**: bcryptjs (Password Hashing)

## ✨ Key Features

- **🔐 Secure Authentication**:
  - User registration and login with encrypted passwords.
  - JWT-based authentication stored in HTTP-Only cookies for enhanced security.
  - Protected routes using custom middleware.

- **📽️ Movie Management**:
  - CRUD operations for movies.
  - Comprehensive data validation for movie details (Release Year, Runtime, etc.).

- **📝 Watchlist System**:
  - Add movies to a personal watchlist.
  - Track viewing status (Planned, Watching, Completed, Dropped).
  - Rate movies and add personal notes.
  - Prevent duplicate entries automatically.

- **🛡️ Robust Error Handling**:
  - Centralized error handling.
  - Graceful server shutdown.
  - Input validation error formatting for clear client feedback.

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/RUSIRUDEVINDA/Backend-Development.git
    cd Backend-Development
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5001
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
    JWT_SECRET="your_super_secret_key"
    JWT_EXPIRES_IN="7d"
    NODE_ENV="development"
    ```

4.  **Database Setup**
    Run the Prisma migrations to set up your database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Start the Server**
    ```bash
    npm run dev
    ```
    The server will run on `http://localhost:5001`.

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Create a new user account.
- `POST /auth/login` - Log in and receive a JWT cookie.
- `POST /auth/logout` - Clear the auth cookie.

### Movies
- `GET /movies` - List all movies.
- `POST /movies` - Create a new movie (Admin/Protected).
- `GET /movies/:id` - Get details of a specific movie.
- `PUT /movies/:id` - Update a movie.
- `DELETE /movies/:id` - Delete a movie.

### Watchlist
- `POST /watchlist` - Add a movie to your watchlist.
- `PUT /watchlist/:id` - Update status, rating, or notes.
- `DELETE /watchlist/:id` - Remove a movie from the watchlist.

## 🧠 Learning Points

Build this project to master the following backend concepts:

1.  **MVC Architecture**: Structuring a Node.js app into Controllers, Routes, and Models (Prisma Schema) for maintainability.
2.  **Prisma ORM**: Defining complex data models with relationships (One-to-Many between User and Watchlist, User and Movies) and executing type-safe database queries.
3.  **Authentication Flow**: Understanding how to generate JWTs, securely store them in HTTP-Only cookies (avoiding LocalStorage XSS vulnerabilities), and verifying them in middleware.
4.  **Input Validation with Zod**: Moving away from manual `if-else` checks to a declarative schema-based validation system that sanitizes inputs before they reach the controller.
5.  **Middleware Pattern**: Creating reusable functions (like `authMiddleware` and `validateRequest`) that intercept requests to handle cross-cutting concerns like security and validation.

## 📜 License

This project is licensed under the ISC License.