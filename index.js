const express = require('express');
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected successfully"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/', checkAuth, staticRouter);
app.use('/user', userRouter);


// Start server on specified port
app.listen(PORT, console.log(`Server started at Port: ${PORT}`));
