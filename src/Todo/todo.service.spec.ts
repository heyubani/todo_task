import { Test, TestingModule } from '@nestjs/testing';

import { TodoService } from './todo.service';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.entity';

describe('ToDoListService', () => {
  let service: TodoService;
  let authService: AuthService;
  let todoId: number;
  let user: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<TodoService>(TodoService);
    authService = module.get<AuthService>(AuthService);

    // user = await authService.signUp({
    //   firstname: 'john',
    //   lastname: 'doe',
    //   username: 'janedoe',
    //   password: 'Password@1',
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

//   it('should create a todo list', async () => {
//     const todo = await service.createTodo(
//       {
//         name: 'work',
//       },
//       user,
//     );

//     expect(todo).toBeDefined();
//     todoId = todo.id;
//   });

//   it('should get all todo lists', async () => {
//     const todo = await service.getAllTodo(user);

//     expect(todo).toBeDefined();
//     expect(todo.length).toBeGreaterThan(0);
//   });

//   it('should delete todo list', async () => {
//     await service.deleteTodo(todoId, user);
//   });
});
