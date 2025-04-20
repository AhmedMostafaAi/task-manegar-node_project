const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect.js');
require('dotenv').config();
const axios = require('axios');

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();