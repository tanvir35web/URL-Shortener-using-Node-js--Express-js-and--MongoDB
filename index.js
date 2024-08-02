const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT = 8000;

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected successfully"));


app.use(express.json());
app.use('/url', urlRoute);


// Start server on specified port
app.listen(PORT, console.log(`Server started at Port: ${PORT}`));
