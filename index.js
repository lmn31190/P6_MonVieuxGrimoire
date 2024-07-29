import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//route import
import authRoutes from './routes/user.js';
import booksRoutes from './routes/book.js';

//DB CONNECT && CONFIG
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconneced");
});

//Middleware

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);


// SERVER RUN
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on PORT ${process.env.PORT}`);
});