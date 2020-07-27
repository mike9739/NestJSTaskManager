import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/getTaskFilter.dto';
import { TaskStatusValidationPipePipe } from './pipes/taskStatusValidationPipe.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto):Task[] {
    if (Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }else {
      return  this.tasksService.getAllTask();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string):Task{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>
  {
     return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
   deleteTask(@Param('id') id : string):void
  {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/status/:id')
  updateTask(@Param('id') id: string,
             @Body('status',TaskStatusValidationPipePipe) status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id,status)
  }

}
