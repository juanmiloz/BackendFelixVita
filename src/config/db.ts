import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Metric } from "../entities/metric.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "password",
    database: "felixVita",
    synchronize: true,
    logging: false,
    entities: [User, Metric],
    subscribers: [],
    migrations: [],
})