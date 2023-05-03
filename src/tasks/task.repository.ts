import {EntityRepository, Repository } from "typeorm";
import { taskEntity } from "./task.entity";

@EntityRepository()
export class taskRepository extends Repository<taskEntity>{

}