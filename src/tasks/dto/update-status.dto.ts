import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateStatusDto{
    @IsEnum(TaskStatus)
    status:TaskStatus;
}