import { tb_comando } from "src/comando/entity/comando.entity";
import { tb_modelo } from "src/modelo/entity/modelo.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_tipo_comando{
    @PrimaryGeneratedColumn()
    id_tipo_comando: number;

    @Column({length: 255})
    tipo_comando: string;

    @Column({type: 'int'})
    id_status: number;

    @Column({length: 500, nullable: true})
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

    @OneToMany(type => tb_comando, comando => comando.tipo_comando)
    comando2: number;

}