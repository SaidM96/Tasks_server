import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { taskStatus } from "../task.module";

export class TaskFilterDto {
    @IsOptional()
    @IsIn([taskStatus.DONE, taskStatus.IN_PROGRESS, taskStatus.OPEN])
    status:taskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}