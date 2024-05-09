import { User } from './../auth/user.entity';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDTO } from './dto/get-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(getTasksDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(getTasksDTO, user);
  }

  async getTaskById(id: number, user: User) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    user: User,
    todo_id: number,
  ): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDTO, user, todo_id);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    taskStatus: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = taskStatus;
    await task.save();
    return task;
  }
}
