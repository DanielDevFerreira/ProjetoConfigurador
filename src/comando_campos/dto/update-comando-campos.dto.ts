import { IsOptional } from "class-validator";

export class UpdateCommandFieldsDto{
    
    @IsOptional()
    quantities: any
}