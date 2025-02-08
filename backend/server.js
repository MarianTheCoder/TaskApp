const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function connectDB() {
    let mongoURI = process.env.MONGODB_URI || '';
  
    // If no external MongoDB, use in-memory server
    if (!mongoURI) {
      const mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      console.log('Running in-memory MongoDB');
    }
  
    mongoose.connect(mongoURI);
  
    mongoose.connection.once('open', () => {
      console.log('MongoDB connected:', mongoURI);
    });
  }
  
app.use('/api', authRoutes);

app.listen(4000,  () => {
    console.log('Server started on port 4000');
    connectDB();
});
