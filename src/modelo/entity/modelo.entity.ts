import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_modelo{
    @PrimaryGeneratedColumn()
    id_modelo: number;
}