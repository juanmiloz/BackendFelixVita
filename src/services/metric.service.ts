import { AppDataSource } from "../config/db";
import { Metric } from "../entities/metric.entity";
import { User } from "../entities/user.entity";

class MetricService {

    private metricRepository = AppDataSource.getRepository(Metric);
    private userRepository = AppDataSource.getRepository(User);

    public async getUserMetrics(username: string): Promise<Metric[]> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    username: username,
                },
                relations: {
                    metrics: true,
                },
            });

            if (!user) {
                throw new Error("User not found");
            }

            return user.metrics;
        }catch (err){
            throw err;
        }
    }

    public async createUserMetric(username: string, metric: Metric): Promise<Metric> {
        try {
            const userSearched = await this.userRepository.findOne({
                where: {
                    username: username,
                },
            });
    
            if (!userSearched) {
                throw new Error("User not found");
            }
            metric.userId = userSearched.id;

            return await this.metricRepository.save(metric);
        } catch (err) {
            throw err;
        }
    }

}

export default new MetricService();