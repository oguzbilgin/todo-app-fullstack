# TodoApp Backend API

A production-ready backend API for a Todo application, built with **.NET 9**, **Clean Architecture**, and **JWT-based authentication**.

This project demonstrates how to design a maintainable and scalable backend using layered architecture, clear separation of concerns, and modern authentication & authorization practices.  
It is designed to be consumed by a mobile client built with **React Native (Expo)**.

---

## 🧠 Architectural Overview

The backend follows **Clean Architecture** principles, ensuring that business logic is independent of frameworks, databases, and external concerns.

### Key goals
- Clear separation of concerns
- Framework-independent business logic
- Testable and maintainable codebase
- Secure, stateless authentication
- Mobile-first API design

---

## 🧩 Architecture Layers


- **API**  
  HTTP layer responsible for request handling, authentication, and authorization.

- **Application**  
  Contains business use cases, services, DTOs, and application-level interfaces.

- **Domain**  
  Core business entities and rules (pure C# with no external dependencies).

- **Infrastructure**  
  Database access, repositories, persistence logic, and EF Core configuration.

---

## ✨ Features

- 🔐 JWT-based Authentication & Authorization
- 👤 User registration and login
- 📝 Todo management
- ✅ Todo completion tracking
- 📂 Completed todo history
- 🧱 Clean Architecture (API / Application / Domain / Infrastructure)
- 🗄️ PostgreSQL with Entity Framework Core
- 🛡️ Global exception handling middleware
- 🧾 Claims-based user identity
- 🚫 No userId passing from client (derived from JWT)

---

## 🛠️ Tech Stack

### Backend
- .NET 9 Web API
- Clean Architecture
- Entity Framework Core (EF Core)

### Database
- PostgreSQL
- EF Core Migrations

### Authentication & Security
- JWT (JSON Web Tokens)
- Bearer authentication
- Claims-based authorization
- Secure password hashing (SHA256 for demo purposes)

### Tooling
- OpenAPI / Swagger
- Docker & Docker Compose (for infrastructure)

---

## 📁 Project Structure

```
src/
├── TodoApp.API/
│ ├── Controllers/
│ ├── Middleware/
│ ├── Program.cs
│ └── appsettings.json
│
├── TodoApp.Application/
│ ├── DTOs/
│ ├── Interfaces/
│ ├── Services/
│ └── ...
│
├── TodoApp.Domain/
│ ├── Entities/
│ │ ├── User.cs
│ │ ├── Todo.cs
│ │ └── CompletedTodo.cs
│ └── ...
│
├── TodoApp.Infrastructure/
│ ├── Data/
│ │ ├── AppDbContext.cs
│ │ └── Migrations/
│ ├── Repositories/
│ └── ...
│
└── TodoApp.sln
```

---

## 🔐 Authentication Flow

1. User signs up or signs in
2. Backend issues a JWT access token
3. Token is sent via `Authorization: Bearer <token>`
4. User identity is resolved from token claims
5. Protected endpoints require `[Authorize]`

> The API is fully stateless — no server-side sessions.

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint            | Description              |
|------|---------------------|--------------------------|
| POST | /api/auth/signup    | Register a new user      |
| POST | /api/auth/signin    | Authenticate & get JWT   |

---

### Todos (Authenticated)

| Method | Endpoint                         | Description                  |
|------|----------------------------------|------------------------------|
| POST | /api/todo/add                    | Create a new todo            |
| POST | /api/todo/{todoId}/complete      | Mark todo as completed       |
| GET  | /api/todo/user                   | Get active todos             |
| GET  | /api/todo/user/completed         | Get completed todos          |

> All Todo endpoints require a valid JWT Bearer token.

---

## ⚙️ Environment Variables

Copy `appsettings.Example.json` to `appsettings.Development.json` and configure:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=YOUR_DB;Username=YOUR_USER;Password=YOUR_PASSWORD"
  },
  "Jwt": {
    "Key": "YOUR_SECRET_KEY",
    "Issuer": "TodoApp.API",
    "Audience": "TodoApp.API",
    "DurationInMinutes": 60
  }
}
```

## 🐳 Docker & Infrastructure
Infrastructure services are managed via Docker Compose.

### Setup environment
```
cp .env.example .env
```

### Start services
```
docker compose up -d
```
This will start:
- PostgreSQL
---

## 🚀 Getting Started

### Restore dependencies
```
dotnet restore
```

### Apply migrations
```
dotnet ef database update --startup-project TodoApp.API --project TodoApp.Infrastructure
```

### Run API
```
dotnet run --project TodoApp.API
```
API will start at:
```
https://localhost:5197
```

##📌 Notes

- Authentication is mandatory for all Todo endpoints
- User identity is extracted from JWT claims, not request parameters
- Designed to be consumed by a mobile client (React Native / Expo)

## License
This project is licensed under the MIT License.

## 👤 Author
**Oğuzhan Bilgin**
- [Github](https://github.com/oguzbilgin)
- [LinkedIn](https://www.linkedin.com/in/oguzhanbilgin/)
---