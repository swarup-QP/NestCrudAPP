import { TaskStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
