import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTO/create-task.dto';
import { GetTaskFilterDto } from './DTO/getTaskFilter.dto';
import { TaskStatusValidationPipePipe } from './pipes/taskStatusValidationPipe.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/getUser.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTask(@Query(ValidationPipe) filterDto:GetTaskFilterDto,
          @GetUser() user:User):Promise<Task[]> {
    return this.tasksService.getTask(filterDto,user);
  }

  @Get('/:id')
  getTaskById(@Param('id',ParseIntPipe)  id: number,
              @GetUser() user:User):Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto,
             @GetUser() user:User):Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id',ParseIntPipe)  id: number,@GetUser() user:User):Promise<void>{
    return this.tasksService.deleteTaskWithDelete(id,user);
  }

  @Patch('/status/:id')
  async updateTaskStatus( @Param('id',ParseIntPipe) id:number , @Body('status',TaskStatusValidationPipePipe) status: TaskStatus,@GetUser() user:User): Promise<Task>{
    return await this.tasksService.updateTaskStatus(id,status,user);
}
}
