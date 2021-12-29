import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Task, TaskStatus } from '@prisma/client';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data: dto });
  }

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    //TODO check if this functions throws an error if you do not send anything in the body at all. In get-tasks.filter.dto.ts both properties are optional, so they can be undefined, right?

    try {
      return this.prisma.task.findMany({
        where: {
          status,
          OR: [
            {
              description: { contains: search },
              title: { contains: search },
            },
          ],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTaskById(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { status },
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
