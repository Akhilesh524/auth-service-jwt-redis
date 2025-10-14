🔐 Authentication Service with JWT + Redis (Session Caching)

This project is a Node.js-based Authentication Service that implements secure user authentication using JWT (JSON Web Tokens) and Redis for token blacklisting and session caching.
Redis is integrated through Docker, enabling efficient session management and token invalidation.

---

🚀 Features

User registration and login using JWT

Secure password hashing with bcrypt

Profile fetching through token-based authentication

Logout functionality using Redis for token blacklisting

Middleware-based JWT verification

Redis integration for session caching and invalidation

Dockerized Redis setup for local and production environments

------

Redis (Remote Dictionary Server) is an in-memory data structure store used for caching, session management, and high-speed data retrieval.
In this project, Redis is used to blacklist JWT tokens during logout, ensuring tokens can be invalidated before their expiry.


Logout Flow:

When a user logs out, the JWT token is stored in Redis with an expiry equal to the token’s expiry.

Each time a request is made, the middleware checks Redis for the token.

If the token is found, it is considered invalid and access is denied.

This ensures stateless JWTs can still be forcefully invalidated when needed.

🐳 Using Redis with Docker

Redis runs inside a Docker container for easy setup and portability.
You can start a Redis container using the official image and expose it on port 6379.

To verify Redis is working, you can access it through redis-cli and use the PING command to check the connection.

---

⚙️ JWT Authentication Flow

User Registration – User data is stored securely in the database with the password hashed using bcrypt.

User Login – Credentials are verified, and a JWT token is generated.

Profile Access – JWT is verified from the request header before returning user data.

Logout – Token is blacklisted in Redis, preventing further access.

Middleware – Verifies tokens and checks Redis before processing any protected route.

---

🧩 Technologies Used

Node.js – Server-side JavaScript runtime

Express.js – Web framework for routing and APIs

JWT (Json Web Token) – Authentication mechanism

Redis – In-memory data store for session caching

bcrypt – Password hashing and verification

Docker – Containerization of Redis service

MySQL – Database for user data management

---

🧱 Common Redis Use Cases

Caching frequently used data

Managing user sessions

Implementing rate limiting

Token blacklisting for logout

Temporary key-value storage

---

