import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
})
export class TasksModule {}
