import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { CreateTodoDTO } from './todoDto/dto';

const mockTodoRepository = () => ({
  find: jest.fn(),
  createTodo: jest.fn(),
  update: jest.fn(),
});

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        { provide: TodoRepository, useFactory: mockTodoRepository },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<TodoRepository>(TodoRepository);
  });

  describe('getAllTodo', () => {
    it('should return all todos for the logged-in user', async () => {
      const user = new User();
      user.id = 1;
      const todoResult = [{ id: 1, title: 'Test Todo', user }];
      todoRepository.find.mockResolvedValue(todoResult);

      const result = await todoService.getAllTodo(user);
      expect(result).toEqual(todoResult);
      expect(todoRepository.find).toHaveBeenCalledWith({
        where: { user: user.id },
      });
    });
  });

  describe('createTodo', () => {
    it('should successfully create a todo', async () => {
      const user = new User();
      user.id = 1;
      const createTodoDTO = new CreateTodoDTO();
      createTodoDTO.title = 'New Todo';

      const savedTodo = { ...createTodoDTO, id: 1, user };
      todoRepository.createTodo.mockResolvedValue(savedTodo);

      const result = await todoService.createTodo(createTodoDTO, user);
      expect(result).toEqual(savedTodo);
      expect(todoRepository.createTodo).toHaveBeenCalledWith(
        createTodoDTO,
        user,
      );
    });
  });

  describe('deleteTodo', () => {
    it('should successfully delete a todo', async () => {
      const user = new User();
      user.id = 1;
      todoRepository.update.mockResolvedValue({ affected: 1 });

      await todoService.deleteTodo(1, user);
      expect(todoRepository.update).toHaveBeenCalledWith(
        { id: 1, user: { id: user.id }, is_deleted: false },
        { is_deleted: true },
      );
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      todoRepository.update.mockResolvedValue({ affected: 0 });

      await expect(todoService.deleteTodo(1, new User())).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
