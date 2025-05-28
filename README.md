# Task Manager Web App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks within a team.

## Live Website

🌐 [http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/](http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/)

## Features

- User authentication (Email/password, Google OAuth)
- Create, assign, and delete tasks
- Task filtering by status
- Separate views for tasks assigned by and to the user
- GitHub login removed due to requirement changes

## Tech Stack

- **Frontend**: React (Vite) – hosted on **AWS S3**
- **Backend**: Node.js + Express – deployed via **AWS Elastic Beanstalk**
- **Database**: **MongoDB Atlas**

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/YourRepoName.git
cd YourRepoName
2. Set up environment variables
Create a .env file in the server/ directory with the following:

env
Copy
Edit
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
3. Install dependencies
bash
Copy
Edit
# In root directory
cd server
npm install

cd ../client/my-vite-app
npm install
4. Run locally
bash
Copy
Edit
# Start backend
cd server
node server.js

# Start frontend
cd ../client/my-vite-app
npm run dev
5. Deployment
Frontend is hosted on AWS S3
http://todotaskbucket.s3-website.ap-south-1.amazonaws.com/

Backend is deployed to AWS Elastic Beanstalk

MongoDB Atlas is used for cloud database storage

API Base URL
Update your frontend API requests to point to your Elastic Beanstalk backend URL like:

txt
Copy
Edit
https://your-backend-url.elasticbeanstalk.com
Assumptions
AWS setup (S3 and Elastic Beanstalk) is already configured and deployed

MongoDB Atlas is properly set up with network access

Environment variables are securely stored on the backend

React app build files are uploaded to the correct S3 bucket

Credits
This project is a part of a hackathon run by
https://www.katomaran.com

Replace `YourUsername/YourRepoName` and backend URL as needed. Let me know if you want the backend deployed URL added too.






