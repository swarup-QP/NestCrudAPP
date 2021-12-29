import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { TaskCreateDto } from './dto/task-create.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Post()
  async createTask(@Body() taskCreateDto: TaskCreateDto): Promise<Task> {
    return this.taskService.createTask(taskCreateDto);
  }
  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById({ id: Number(id) });
  }
  @Get()
  async getAllTask(@Query() filterDto: GetFilterTaskDto): Promise<Task[]> {
    const { search, status } = filterDto;
    return this.taskService.tasks({
      where: {
        OR: [
          {
            title: { contains: search },
          },
          {
            description: { contains: search },
          },
          {
            status: { equals: status },
          },
        ],
      },
    });
  }
  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTaskById({ id: Number(id) });
  }
  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() statusUpdateDto: UpdateStatusDto,
  ): Promise<Task> {
    const { status } = statusUpdateDto;
    return this.taskService.updateTaskStatus({
      where: { id: Number(id) },
      data: { status: status },
    });
  }
  /*@Get()
    getAllTask(@Query() filterDto:GetFilterTaskDto):Task[]{
     if(Object.keys(filterDto).length)  {
     return this.taskService.getFilterTasks(filterDto);
     } else{
      return this.taskService.getAllTasks();
     }
     
    }
    @Post()
    createTask(@Body() taskCreateDto:TaskCreateDto):Task{
     return this.taskService.createTask(taskCreateDto);
    }
    @Get('/:id')
    getTask(@Param('id') id:string){
    return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.taskService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateStatus(@Param('id') id:string,@Body() statusUpdateDto:UpdateStatusDto){    
       const  {status} = statusUpdateDto;
       return this.taskService.updateTaskStatus(id,status);
    }*/
}
