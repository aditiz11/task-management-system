

# Task Management System

A fullstack task management system built with **Node.js**, **Express**, **Prisma**, **PostgreSQL**, and **React**.  
Users can create and manage tasks, while admins can view all users' tasks and assign tasks.

---

## Features

### User
- Register and login securely.
- Create tasks for themselves.
- Update task status (`Not Started`, `In Progress`, `Finished`).

### Admin
- View all users and their tasks (read-only for other users' tasks).
- Assign tasks to other users.
- Add tasks for themselves.
- Update the status of their own tasks.

---

## Tech Stack

- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL
- **Frontend:** React, Vite
- **Authentication:** JWT, BCrypt
- **Styling:** CSS

---

## Project Structure

```

backend/
├─ src/
│  ├─ controllers/
│  │  ├─ auth.controller.js
│  │  └─ task.controller.js
│  ├─ middlewares/
│  │  ├─ auth.middleware.js
│  │  └─ role.middleware.js
│  ├─ routes/
│  │  ├─ auth.routes.js
│  │  └─ task.routes.js
│  ├─ config/
│  │  └─ db.js
│  └─ server.js
├─ prisma/
│  └─ schema.prisma
├─ package.json
└─ .env
frontend/
├─ src/
│  ├─ api.js
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  └─ main.jsx
├─ package.json
└─ vite.config.js

````

---

## Setup Instructions

### Backend

1. Navigate to the backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder with:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_jwt_secret_here"
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the backend server:

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

---

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## Usage

1. Register as a new user.
2. Login with your credentials.
3. Users can create tasks for themselves and update their status.
4. Admins can:

   * View all users and their tasks.
   * Assign tasks to other users or themselves.
   * Update the status of their own tasks.

---

## Screenshots

**Dashboard (User)**

![User Dashboard](<img width="1920" height="1020" alt="User-dashboard" src="https://github.com/user-attachments/assets/3a169482-c136-4501-b610-90e2fcc3cbb7" />)

**Dashboard (Admin)**
<img width="1920" height="1020" alt="Admin-dashboard" src="https://github.com/user-attachments/assets/8584fb52-1258-4597-b5cf-0e78cccbe045" />

![Admin Dashboard]

**Prisma DashBoard**
<img width="1920" height="1020" alt="prisma-dashboard" src="https://github.com/user-attachments/assets/cf6956b7-9b27-4438-aae3-7346a247c3eb" />

![Prisma DashBoard]
---


```

---

