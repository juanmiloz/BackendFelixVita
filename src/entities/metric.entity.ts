import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("metrics")
export class Metric extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "int" })
    waterIntake: number;

    @Column({type: "int" })
    sleepHours: number;

    @Column()
    mood: string;

    @Column({type: "int" })
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.metrics, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;
}