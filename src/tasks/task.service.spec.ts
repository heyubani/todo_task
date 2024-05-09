import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-task.dto';
import { User } from '../auth/user.entity';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  softDelete: jest.fn(),
  save: jest.fn(),
});

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('should return all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue'); // Adjust the return value as needed
      expect(
        await tasksService.getTasks(new GetTasksFilterDTO(), new User()),
      ).toBe('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should retrieve and return a task', async () => {
      const mockTask = { id: 123, title: 'Test Task' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(123, new User());
      expect(result).toEqual(mockTask);
    });

    it('should throw a NotFoundException if no task is found', async () => {
      taskRepository.findOne.mockResolvedValue(null);

      await expect(tasksService.getTaskById(123, new User())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('should successfully create a new task', async () => {
      const mockTask = {
        title: 'Test Task',
        description: 'Test Desc',
        due_date: new Date('2024-05-09'),
      };
      taskRepository.createTask.mockResolvedValue(mockTask);

      expect(await tasksService.createTask(mockTask, new User(), 1)).toEqual(
        mockTask,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete the task if it exists', async () => {
      taskRepository.softDelete.mockResolvedValue({ affected: 1 });

      await tasksService.deleteTask(1); // No return value to test
      expect(taskRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if no task is found', async () => {
      taskRepository.softDelete.mockResolvedValue({ affected: 0 });

      await expect(tasksService.deleteTask(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateTaskStatus', () => {
    it('should update the status of the task', async () => {
      const save = jest.fn().mockResolvedValue(true);
      const mockTask = { id: 123, status: TaskStatus.OPEN, save };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const updatedTask = await tasksService.updateTaskStatus(
        123,
        TaskStatus.DONE,
        new User(),
      );
      expect(updatedTask.status).toBe(TaskStatus.DONE);
      expect(save).toHaveBeenCalled();
    });
  });
});
