import { Express, Request, Response } from "express";
import authController from "../controllers/auth.controller";
import metricController from "../controllers/metric.controller";
import { auth } from "../middleware/auth";
import limiter from "../restrictions/rateLimit";
import cors from "cors";

const corsOptions = {
    origin: ['*'], // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    optionsSuccessStatus: 200,
  };


const routes = (app: Express) => {
    app.post("/login", cors(corsOptions), authController.login);
    app.post("/register", cors(corsOptions),authController.register);
    app.post("/metric/:username", cors(corsOptions),auth, limiter,metricController.addUserMetric);
    app.get("/metric/:username", cors(corsOptions),auth, limiter,metricController.getUserMetrics);

    app.get("/getAll", authController.getall);
}

export default routes;