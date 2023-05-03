import { Body, Controller , Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { task, taskStatus } from './task.module';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskFilterDto } from './dto/taskFilter.dto';
import { TaskStatusPipe } from './pipes/TaskStatusPipe.pipe';
import { taskEntity } from './task.entity';

@Controller('tasks')    
export class TasksController {

    // Part 1

    constructor(private tasksService:TasksService){}

    // Get all Tasks Controller
    @Get()
    getAllTasks(@Query(ValidationPipe) taskFilterDto:TaskFilterDto):task[]{
        if (Object.keys(taskFilterDto).length)
            return this.tasksService.getTaskfilter(taskFilterDto);
        return this.tasksService.getAllTasks();
    }

    // Get  Task By ID Controller
    @Get('/:id')
    getTaskByID(@Param('id') id:string){
        return this.tasksService.getTaskByID(id);
    }

    // create a Task Controller
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() creatTaskDto:CreateTaskDto) :task{
        return this.tasksService.createTask(creatTaskDto);
    }

    // Delete a Task By Id Controller
    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        this.tasksService.deleteTaskById(id);
    }

    // updating status
    @Patch('/:id/status')
    updateTask(@Param('id') id:string, @Body('status', TaskStatusPipe) status:taskStatus): task{
        return this.tasksService.updateTaskStatus(id, status);
    }

    // Part 2
    // constructor(private tasksService:TasksService){}

    // // Get  Task By ID Controller
    // @Get()
    // getAllTasks():number{
    //     return 1;
    // }

    // @Get('/:id')
    // getTaskByID(@Param('id', ParseIntPipe) id:number): Promise<taskEntity>{
    //     return this.tasksService.getTaskById(id);
    // }

}