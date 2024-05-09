import { User } from './../auth/user.entity';
import { CreateTodoDTO } from './todoDto/dto';
import { Todo } from './todo.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(createTodoDTO: CreateTodoDTO, user: User): Promise<Todo> {
    const { name } = createTodoDTO;
    const todo = new Todo();
    todo.name = name;
    todo.user = user;
    await todo.save();

    delete todo.user;
    return todo;
  }
}
