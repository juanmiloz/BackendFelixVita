import { Express, Request, Response } from "express";
import authController from "../controllers/auth.controller";
import metricController from "../controllers/metric.controller";
import { auth } from "../middleware/auth";
import limiter from "../restrictions/rateLimit";

const routes = (app: Express) => {
    app.post("/login", authController.login);
    app.post("/register", authController.register);
    app.post("/metric/:username", auth, limiter,metricController.addUserMetric);
    app.get("/metric/:username", auth, limiter,metricController.getUserMetrics);

    app.get("/getAll", authController.getall);
}

export default routes;