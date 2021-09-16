import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'tb_envio'})
export class EnvioEntity{

    @PrimaryGeneratedColumn({type: 'bigint'})
    id_envio: number;

    @Column({type: 'int'})
    id_usuario: number;

    @Column({type: 'varchar', length: 255})
    comando: string;

    @Column({type: 'int'})
    id_comando: number;

    @Column({type: 'varchar', length: 25})
    telefone: string;

    @Column({type: 'int'})
    status_api: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}