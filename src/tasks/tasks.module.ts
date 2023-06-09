import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskRepository } from './task.repository';
import { taskEntity } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([taskEntity, taskRepository]),],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
