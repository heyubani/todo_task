import { User } from './../auth/user.entity';
import { GetTasksFilterDTO } from './dto/get-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Todo } from '../Todo/todo.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search, page = 1, per_page = 10 } = filterDto;
    const offset = (page - 1) * per_page;

    const query = this.createQueryBuilder('task');

    query.where('task.user = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query
      .orderBy('task.created_at', 'DESC')
      .skip(offset)
      .take(per_page)
      .getMany();
    return tasks;
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    user: User,
    todo_id: number,
  ): Promise<Task> {
    const { title, description, due_date } = createTaskDTO;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.due_date = due_date;
    task.user = user;
    task.todo = todo_id;
    await task.save();

    delete task.user;
    return task;
  }
}
