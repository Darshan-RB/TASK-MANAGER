# Task Manager Web App
This project is a part of a hackathon run by  
[https://www.katomaran.com](https://www.katomaran.com)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks within a team.

---

## Live Website

[http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/](http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/)

---

## Features

- User authentication (Email/Password, Google OAuth)
- Create, assign, update, and delete tasks
- Task filtering based on status (Pending, Completed)
- Separate views for:
  - Tasks assigned *by* the user
  - Tasks assigned *to* the user
- GitHub login removed due to requirement changes

---

## Tech Stack

- **Frontend**: React (Vite) – hosted on **AWS S3**
- **Backend**: Node.js + Express – deployed via **AWS Elastic Beanstalk**
- **Database**: **MongoDB Atlas**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Darshan-RB/TASK-MANAGER.git
cd TASK-MANAGER

```

### 2. Set up Environment Variables

Create a `.env` file inside the `server/` directory with the following:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client/my-vite-app
npm install
```

### 4. Run Locally

```bash
# Start backend
cd server
node server.js

# Start frontend
cd ../client/my-vite-app
npm run dev
```

---

## Deployment

- **Frontend**: [AWS S3](http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/)
- **Backend**: AWS Elastic Beanstalk (`https://your-backend-url.elasticbeanstalk.com`)
- **Database**: MongoDB Atlas

### API Base URL

Update your frontend API requests to use:

```
https://your-backend-url.elasticbeanstalk.com
```

---

## Assumptions

- AWS (S3 + Elastic Beanstalk) setup is already configured and deployed.
- MongoDB Atlas is set up with correct IP/network access and user credentials.
- All environment variables are securely stored in the backend and Google Cloud Console.
- The React app is built and uploaded correctly to the designated S3 bucket.

---

## Credits

This project is a part of a hackathon run by  
[https://www.katomaran.com](https://www.katomaran.com)
