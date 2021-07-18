
import { tb_modelo_tipo_comando } from "src/modelo_tipo_comando/entity/modelo.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_comando{
    @PrimaryGeneratedColumn()
    id_comando: number;

    @Column({length: 255})
    comando: string;
    
    // @Column({length: 255})
    // campos_do_comando: string;

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

    // @OneToOne(type => tb_modelo_tipo_comando, modelo_tipo_comando => modelo_tipo_comando.comando)
    // @JoinColumn({name: 'id_modelo_tipo_comando'})
    // modelo_tipo_comando: number;

}