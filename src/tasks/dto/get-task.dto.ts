import { IsIn, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsNotEmpty()
  start_date: string;

  @IsOptional()
  @IsNotEmpty()
  end_date: string;

  @IsOptional()
  @IsPositive()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsPositive()
  @Min(1)
  per_page?: number;
}
