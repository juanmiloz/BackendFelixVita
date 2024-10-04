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
  origin: 'http://localhost:4200', // Cambia esto por la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

app.use(cors(corsOptions))
app.use(express.json());

routes(app);

AppDataSource.initialize();
app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});