# TodoApp Mobile

A production-ready **mobile Todo application** built with **React Native (Expo)** and **TypeScript**, designed to consume a backend API built with **Clean Architecture** and **JWT-based authentication**.

This project focuses on **clean architecture on the client**, **predictable state management**, and a **modern mobile UX**, while implementing **only the features supported by the backend**.

---

## 📱 App Overview

The mobile application allows users to:

- Authenticate securely (Sign in)
- View active todos
- Create new todos
- Mark todos as completed
- View completed todo history

The app is built using **Expo Router** and follows a **mobile-first, API-driven design**.

---

## ✨ Features

- 🔐 JWT-based authentication
- 📝 Create todos
- 📋 View active todos
- ✅ Complete todos
- 📂 View completed todos
- 🧠 Centralized state management
- 🎨 Consistent card-based UI
- 📱 iOS & Android support via Expo

> Only features supported by the backend API are implemented — no mock or extra client-only functionality.

---

## 🧠 Architecture & Design Principles

### Key goals
- Feature-based routing with Expo Router
- Clear separation between UI, state, and API layers
- Reusable components
- Predictable global state
- Clean and readable codebase

---

## 🗂️ Folder Structure
```
mobile/
├── app/ # Expo Router pages
│ ├── (tabs)/
│ │ ├── _layout.tsx # Bottom tab navigation
│ │ ├── index.tsx # Home (Active Todos)
│ │ ├── add-todo.tsx # Add new todo
│ │ └── completed-todos.tsx # Completed todos
│ │
│ ├── auth/
│ │ ├── _layout.tsx # Auth layout
│ │ └── index.tsx # Sign In screen
│ │
│ ├── _layout.tsx # Root layout
│ └── index.tsx # App entry / redirect
│
├── src/
│ ├── components/
│ │ └── TodoItem.tsx # Reusable todo item component
│ │
│ ├── config/
│ │ └── tamagui.config.ts # Tamagui configuration
│ │
│ ├── lib/
│ │ └── api.ts # API client & HTTP logic
│ │
│ └── store/
│ ├── auth.store.ts # Authentication state
│ └── todo.store.ts # Todo state & actions
│
├── assets/ # Static assets
├── app.json
├── babel.config.js
├── eslint.config.js
├── package.json
├── tsconfig.json
└── README.md
```
---
## 🛠️ Tech Stack

### Mobile
- React Native
- Expo
- Expo Router
- TypeScript

### UI & Styling
- Tamagui
- Lucide Icons
- Custom design tokens

### State Management
- Zustand

### Networking
- Axios
- JWT Bearer authentication

---

## 🔐 Authentication Flow

1. User signs in
2. Backend returns a JWT access token
3. Token is stored in the auth store
4. Protected requests include:
5. User session is validated on app load

---

## 🔄 API Integration

The mobile app communicates with the backend via REST endpoints.

### Authentication
- Sign in

### Todos
- Fetch active todos
- Add new todo
- Complete todo
- Fetch completed todos

> User identity is fully derived from JWT claims — no userId is sent from the client.

---

## 🎨 UI & UX Notes

- Mobile-first design
- Card-based layout with subtle shadows
- Clear hierarchy and spacing
- Focus on clarity and ease of use
- UI strictly matches implemented backend functionality

---

## ⚙️ Environment Setup

Create a `.env` file in the `mobile` directory:
```
EXPO_PUBLIC_API_URL=http://localhost:5197
```
> Ensure the backend API is running before starting the app.

---

## 🚀 Getting Started

### Install dependencies
```
npm install
```

### Start the app
```
npx expo start
```
Run on:
- iOS Simulator
- Android Emulator
- Physical device via Expo Go

---

## 📌 Notes

- Authentication is required for all todo operations
- No local or mock data is used
- State is fully API-driven
- Designed as a portfolio-quality mobile application

---

## License
This project is licensed under the MIT License.

## 👤 Author
**Oğuzhan Bilgin**
- [Github](https://github.com/oguzbilgin)
- [LinkedIn](https://www.linkedin.com/in/oguzhanbilgin/)
---