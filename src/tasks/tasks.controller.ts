import { User } from './../auth/user.entity';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { GetTasksFilterDTO } from './dto/get-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { successResponse } from '../utils';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ) {
    const data = await this.tasksService.getTasks(filterDTO, user);
    return successResponse(200, 'Users list successfully fetched', data);
  }

  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post(':todo_id')
  async createTask(
    @Param('todo_id') todo_id: number,
    @Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User,
  ) {
    const data = await this.tasksService.createTask(
      createTaskDto,
      user,
      todo_id,
    );
    return successResponse(201, 'Todo task created successfully', data);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void | object> {
    await this.tasksService.deleteTask(id);
    return successResponse(200, 'Task deleted successfully');
  }

  @Put(':id/status')
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: TaskStatus,
    @GetUser() user: User,
  ) {
    const data = await this.tasksService.updateTaskStatus(id, status, user);
    return successResponse(200, 'Task successfully update', data);
  }
}
