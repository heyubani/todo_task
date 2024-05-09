import { User } from './../auth/user.entity';
import { CreateTodoDTO } from './todoDto/dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { successResponse } from '../utils';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async getAllTodo(@GetUser() user: User) {
    const data = await this.todoService.getAllTodo(user);
    return successResponse(200, 'Todo list fetched successfully', data);
  }

  @Post('')
  async createTodo(@Body() body: CreateTodoDTO, @GetUser() user: User) {
    const data = await this.todoService.createTodo(body, user);
    return successResponse(201, 'Todo list created successfully', data);
  }

  @Patch(':id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    await this.todoService.deleteTodo(id, user);
    return successResponse(200, 'Todo deleted successfully');
  }
}
