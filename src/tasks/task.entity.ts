import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { taskStatus } from "./task.module";

@Entity()
export class taskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: taskStatus;
}