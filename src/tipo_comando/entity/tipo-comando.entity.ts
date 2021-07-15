import { tb_modelo } from "src/modelo/entity/modelo.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_tipo_comando{
    @PrimaryGeneratedColumn()
    id_tipo_comando: number;

    @Column({length: 255})
    tipo_comando: string;

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

    @ManyToOne(type => tb_modelo, modelo => modelo.tipo_comando)
    @JoinColumn({name: 'id_modelo'})
    modelo: number;

}