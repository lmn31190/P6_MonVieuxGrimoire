import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';

//route import
import authRoutes from './routes/user.js';
import booksRoutes from './routes/book.js';

//DB CONNECT && CONFIG
const app = express();

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
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

app.use((req, res, next) => {
  // Accès à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // Autorisation d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'images')));

//ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);


// SERVER RUN
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on PORT ${process.env.PORT}`);
});