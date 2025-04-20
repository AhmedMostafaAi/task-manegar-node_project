# ✅ Task Manager API

A simple and efficient **Task Manager REST API** built with **Node.js**, **Express**, and **MongoDB**. It supports full CRUD functionality and is designed with modular, clean architecture.

## 🚀 Features

- Add, update, delete, and fetch tasks
- RESTful API structure
- MongoDB database connection with Mongoose
- Static frontend support from `public/`
- Organized project structure

## 🗂️ Project Structure

- 📁 controller → Business logic for task routes
- 📁 db → MongoDB connection setup
- 📁 models → Mongoose schema for tasks
- 📁 routes → API route definitions
- 📁 public → Static files served via express
- 📄 app.js → App entry point


## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Tools**: dotenv, axios


## 📦 Setup Instructions

Create a .env file in the root with:
MONGO_URL=your-mongodb-uri



```bash
git clone https://github.com/AhmedMostafaAi/task-manegar-node_project.git
cd task-manager-api
npm install
node app.js

