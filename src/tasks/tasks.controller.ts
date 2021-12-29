import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Get()
  async getAllTask(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.taskService.updateTaskStatus(id, status);
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
    createTask(@Body() createTaskDto:TaskCreateDto):Task{
     return this.taskService.createTask(createTaskDto);
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
    updateStatus(@Param('id') id:string,@Body() updateStatusDto:UpdateStatusDto){    
       const  {status} = updateStatusDto;
       return this.taskService.updateTaskStatus(id,status);
    }*/
}
