import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  [x: string]: string;
  @IsNotEmpty()
  name: string;
}
