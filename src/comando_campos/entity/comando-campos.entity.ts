
import { tb_comando } from "src/comando/entity/comando.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_comando_campos{
    @PrimaryGeneratedColumn()
    id_comando_campos: number;

    @Column({length: 255})
    campo: string;

    @Column({ length: 100})
    label: string;

    @Column({length: 50})
    tipo: string;

    @Column({type: "boolean"})
    obrigatorio: boolean;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => tb_comando, comando => comando.comando_campos, {eager: true})
    @JoinColumn({name: 'id_comando'})
    comando: number;
}