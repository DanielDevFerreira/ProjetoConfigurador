import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto{

    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}