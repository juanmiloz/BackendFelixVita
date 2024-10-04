import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Metric } from "./metric.entity";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Metric, (metric) => metric.user, { cascade: true })
    metrics: Metric[]; 
}