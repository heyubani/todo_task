import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Module } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
