import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuidv4 } from 'uuid'
import {CreateTaskDto} from  './DTO/create-task.dto'
import { GetTaskFilterDto } from './DTO/getTaskFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTask():Task[] {
    return this.tasks;
  }
  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found){
      throw new NotFoundException(`Task with ID: ${id} not found :(`);
    }
    return found
  }

  getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const {status , search} = filterDto;
    let tasks = this.getAllTask();

    if (status){
       tasks = tasks.filter(task => task.status === status)
    }

    if (search){
      tasks = tasks.filter(tasks =>
        tasks.title.includes(search) ||
        tasks.description.includes(search)
      )
    }

    return tasks
  }

  updateTaskStatus(id: string, status: TaskStatus): Task{
    let taskUpdate =  this.getTaskById(id);
    taskUpdate.status = status;
    return taskUpdate
  }

 async createTask(createTaskDto: CreateTaskDto):Promise<Task> {
    const {title, description} = createTaskDto;
    const task:Task={
      id:uuidv4(),
      title,
      description,
      status:TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }

 deleteTask(id: string):void {
    const found = this.getTaskById(id);
     this.tasks = this.tasks.filter(task => task.id !== found.id);
 }

}
