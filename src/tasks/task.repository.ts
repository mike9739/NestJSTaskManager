import { EntityRepository, Repository } from 'typeorm/index';
import { Task } from './task.entity';
import { CreateTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './taskStatus.enum';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
  async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
    const {title, description} = createTaskDto;
    const task = new Task();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;

  }
}