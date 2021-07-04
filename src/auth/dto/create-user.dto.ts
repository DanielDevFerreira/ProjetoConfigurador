import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    
    @IsNotEmpty({ message : 'Informar o campo id tipo login'})
    id_tipo_login: number;

    @IsNotEmpty({ message : 'Informar o campo login'})
    username: string;

    @IsNotEmpty({ message : 'Informar o campo senha'})
    password: string;

    @IsNotEmpty({ message : 'Informar o campo nome'})
    name: string;

    @IsNotEmpty({ message : 'Informar o campo email'})
    email: string;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsNotEmpty({ message : 'Informar o campo id login insert' })
    id_login_insert: number;

    dt_insert: string;
}