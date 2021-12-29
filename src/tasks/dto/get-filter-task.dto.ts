import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetFilterTaskDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;
    @IsOptional()
    @IsString()
    search?:string;
}