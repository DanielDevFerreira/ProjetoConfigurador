import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto{

    id: number;

    @IsNotEmpty({message: "O email é obrigatório"})
    email: string;
}