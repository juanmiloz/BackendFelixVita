// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import { AppDataSource } from "./config/db";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // Cambia esto por la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  optionsSuccessStatus: 200,
};

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', ['Content-Type', "Authorization"]);
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });
app.use(cors(corsOptions))

// app.options('*', cors(corsOptions))

// app.use(cors({
//   origin: 'http://localhost:4200',
// }));

app.use(express.json());

routes(app);

AppDataSource.initialize();
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});