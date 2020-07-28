import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
  }

 async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found){
      throw new NotFoundException(`Task with id: ${id} not found`)
    }
    return found
  }

  async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
      return this.taskRepository.createTask(createTaskDto);
  }

}
