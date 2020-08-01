import { EntityRepository, Repository } from 'typeorm/index';
import { Task } from './task.entity';
import { CreateTaskDto } from './DTO/create-task.dto';
import { TaskStatus } from './taskStatus.enum';
import { GetTaskFilterDto } from './DTO/getTaskFilter.dto';
import { User } from '../auth/user.entity';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

  async createTask(createTaskDto: CreateTaskDto,user):Promise<Task>{
    const {title, description} = createTaskDto;
    const task = new Task();
    task.description = description;
    task.title = title;
    task.user = user;
    task.status = TaskStatus.OPEN;
    await task.save();
    delete task.user;
    return task;
  }


  async getTasks(filterDto:GetTaskFilterDto,user:User): Promise<Task[]> {
    const {status, search} = filterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', {userId: user.id});
    console.log(user)
    if (status) {
      query.andWhere('task.status = :status',{status});
    }
    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', {search: `%${search}%`} );
    }

    const tasks = query.getMany();
    return tasks
  }
}
