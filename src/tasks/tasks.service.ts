import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.model';
import { TaskCreateDto } from './dto/task-create.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }
  async getTaskById(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task> {
    return this.prisma.task.findUnique({ where: taskWhereUniqueInput });
  }
  async tasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async deleteTaskById(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({
      where,
    });
  }
  async updateTaskStatus(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { data, where } = params;
    return this.prisma.task.update({
      data,
      where,
    });
  }
  /*  private tasks:Task[] =[];
    getAllTasks():Task[]{
        return this.tasks;
    }
    createTask(taskCreateDto:TaskCreateDto):Task{
       const { title, description }  = taskCreateDto;
        const task:Task = {
            id: uuid(),
            title:title,
            description:description,
            status:TaskStatus.Open,
        }
        this.tasks.push(task);
        return task;
    }
    getTaskById(id:string):Task{
     const found = this.tasks.find((task)=> task.id===id);
     if(!found){
       throw new NotFoundException(`Task Not Found of ${id}`);
     }
     return found;
    }
    deleteTaskById(id:string):void{
        const found = this.getTaskById(id);
        this.tasks.filter((task)=>task.id !== found.id);
    }
    updateTaskStatus(id:string,status:TaskStatus):Task{
     const task = this.getTaskById(id);
     console.log(task);
     task.status= status
     return task; 
    }
    getFilterTasks(filterDto:GetFilterTaskDto):Task[]{
     const {status,search} = filterDto;
     const tasks = this.getAllTasks();
     if(status) {
      this.tasks.filter((task)=>task.status===status);
     }
     if(search){
         this.tasks.filter((task)=>{
         if(task.title.includes(search) || task.description.includes(search)  ){
             return true;
         }
         return false;
         });
     }
     return tasks;
    }*/
}
