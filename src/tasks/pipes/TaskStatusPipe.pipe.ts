import { BadRequestException, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../task.module";

export class TaskStatusPipe implements PipeTransform {
    readonly statusAllowed = [
        taskStatus.OPEN,
        taskStatus.IN_PROGRESS,
        taskStatus.DONE,
    ];
    
    private isStatusValid(status:any){
        const index = this.statusAllowed.indexOf(status);
        return index !== -1;
    }
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value))
            throw new BadRequestException(`${value} is Not an allowed status`);
        return value;
    }
}