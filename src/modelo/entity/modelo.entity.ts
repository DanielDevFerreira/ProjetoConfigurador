import { tb_comando } from "src/comando/entity/comando.entity";
import { tb_fabricante } from "src/fabricante/entity/fabricante.entity";
import { tb_tipo_comando } from "src/tipo_comando/entity/tipo-comando.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_modelo{
    @PrimaryGeneratedColumn()
    id_modelo: number;

    @Column({length: 255})
    modelo: string;

    @Column({type: 'int'})
    id_status: number;

    @Column({length: 500})
    observacao: string

    @Column({ type: "bigint", nullable: true})
    id_login_insert: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_insert: Date;

    @Column({ type: "bigint", nullable: true})
    id_login_update: number;

    @Column({ type: "datetime", nullable: true})
    dt_update: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => tb_fabricante, fabricante => fabricante.modelo)
    @JoinColumn({name: 'id_fabricante'})
    fabricante: number;

    @ManyToMany(type => tb_comando, comando => comando.modelo)
    @JoinColumn({name: 'id_fabricante'})
    comando: number;

    @OneToMany(type => tb_tipo_comando, tipo_comando => tipo_comando.modelo)
    tipo_comando: number;

}