import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDTO } from './todoDto/dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async getAllTodo(user: User) {
    const todo = await this.todoRepository.find({
      where: { user: user.id },
    });
    return todo;
  }

  async createTodo(createTodoDTO: CreateTodoDTO, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDTO, user);
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const result = await this.todoRepository.update(
      {
        id,
        user: { id: user.id },
        is_deleted: false,
      },
      { is_deleted: true },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with id ${id} does not exist`);
    }
  }
}
