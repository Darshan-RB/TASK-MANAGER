# Task Manager
This project is a part of a hackathon run by https://www.katomaran.com

This is a full-stack task management application that allows users to register, login, create tasks, assign them to users, and update task statuses.

## Features

- User registration and login with email/password and Google OAuth.
- Task creation, assignment, and status update.
- View tasks assigned to or created by a user.
- JWT-based authentication for secure API access.
- RESTful API built with Node.js, Express, and MongoDB.
- Frontend built with React.

## Setup Instructions

1. Clone the repository:
git clone https://github.com/your-username/task-manager.git
cd task-manager

markdown
Copy
Edit

2. Install dependencies in both backend and frontend folders:
cd server
npm install
cd ../client
npm install

markdown
Copy
Edit

3. Create a `.env` file in the `server` folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

markdown
Copy
Edit

4. Start backend server:
npm start

pgsql
Copy
Edit

5. Start frontend development server (in the client folder):
npm start

pgsql
Copy
Edit

## Assumptions

- The project uses MongoDB Atlas, with the connection string provided via `MONGO_URI` environment variable.
- JWT secret key is set in `JWT_SECRET` environment variable.
- Google OAuth credentials and configuration are properly set up.
- Frontend and backend are run separately; CORS is enabled on backend for frontend domain.
- Node.js version 16 or above is used.
- The UI expects the backend API to be running at `http://localhost:5000`.
- The project will be deployed on AWS or a similar cloud platform later.

---

This project is a part of a hackathon run by https://www.katomaran.com
