import { Request, Response } from "express";
import { Metric } from "../entities/metric.entity";
import metricService from "../services/metric.service";

class MetricController {

    public async getUserMetrics(req: Request, res: Response): Promise<Response> {
        try{
            const metrics = await metricService.getUserMetrics(req.params.username);            
            return res.status(200).json({ metrics: metrics });
        }catch (err){
            if( err instanceof Error){
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }


    public async addUserMetric(req: Request, res: Response): Promise<Response>{
        try{
            const { waterIntake, sleepHours, mood } = req.body;

            const metric = new Metric();
            metric.waterIntake = waterIntake;
            metric.sleepHours = sleepHours;  
            metric.mood = mood;
            
            
            const metricSaved = await metricService.createUserMetric(req.params.username, metric);

            return res.status(200).json({ metricSaved: metricSaved });
        }catch (err){
            if( err instanceof Error){
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
        
        
        
        const username = req.params.username;
        return res.status(200).json({ message: username });
    }

}

export default new MetricController();