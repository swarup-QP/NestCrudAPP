import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../tasks.model";
export class TaskCreateDto{
@IsNotEmpty()    
title: string;
@IsNotEmpty() 
description: string;
@IsEnum(TaskStatus)
status:TaskStatus;
}