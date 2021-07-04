import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto{

    id: number;

    @IsNotEmpty({message: "O email é obrigatório"})
    email: string;
}