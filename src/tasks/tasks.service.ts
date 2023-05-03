import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { task, taskStatus } from './task.module';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskFilterDto } from './dto/taskFilter.dto';
import { taskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { taskEntity } from './task.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    
    // Part 1

    private tasks:task[] = [];  

    // Get all Tasks service
    getAllTasks(): task[]{
       return this.tasks;
    }

    // create a Task service
    createTask(creatTaskDto:CreateTaskDto):task{
        const {title, description} = creatTaskDto;
        const newTask:task = {
            id:uuidv4(),
            title,
            description,
            status:taskStatus.OPEN
        }
        this.tasks.push(newTask);
        return newTask;
    }

    // Get  Task By ID service
    getTaskByID(id:string):task{
        const ret = this.tasks.find(ikhan => ikhan.id == id);
        if (!ret)
            throw new NotFoundException(`No Task with id:${id} is Found`);
        return ret;
    }

    // Delete a Task By Id service
    deleteTaskById(id:string)
    {
        //delete task using splice 
        // const Task:task = this.tasks.find(ikhan => ikhan.id === id);
        // const index:number = this.tasks.indexOf(Task);
        // this.tasks.splice(index,1); 
        const t = this.getTaskByID(id); 
        // another solution using filter
        this.tasks = this.tasks.filter(ikhan => ikhan.id !== id);
    }

    //updating a task status
    updateTaskStatus(id:string, status:taskStatus):task{

        const Task:task = this.getTaskByID(id);
        const index:number = this.tasks.indexOf(Task);
        this.tasks[index].status = status;
        return this.tasks[index];
    }

    getTaskfilter(taskFilterDto:TaskFilterDto):task[]{

        const {status, search} = taskFilterDto;
        let result:task[] = this.getAllTasks();
        if (status)
            result = result.filter(ikhan => ikhan.status === status); 
        if (search)
            result = result.filter(ikhan => (ikhan.title.includes(search) || ikhan.description.includes(search)));
        return result;
    }

    // Part 2
    // constructor(
    //     @InjectRepository(taskRepository)
    //     private taskRepo:taskRepository,
    // ) {}

    // // get Task by ID
    // async getTaskById(id: number) : Promise<taskEntity> {
    //     const element = await this.taskRepo.findOne({where: {id}});
    //     if (!element)
    //         throw new NotFoundException(`id: ${id} was not found ikhan`);
    //     return element;
    // }

}   