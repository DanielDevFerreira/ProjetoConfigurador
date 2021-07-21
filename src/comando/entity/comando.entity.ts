import { tb_comando_campos } from "src/comando_campos/entity/comando-campos.entity";
import { tb_modelo } from "src/modelo/entity/modelo.entity";
import { tb_tipo_comando } from "src/tipo_comando/entity/tipo-comando.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class tb_comando{
    @PrimaryGeneratedColumn()
    id_comando: number;

    @Column({length: 255})
    comando: string;

    @Column({type: 'int'})
    id_status: number;

    @Column({length: 500,  nullable: true})
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

    @OneToMany(type => tb_comando_campos, comando_campos => comando_campos.comando)
    comando_campos: number;
    
    @OneToOne(type => tb_modelo, modelo => modelo.comando)
    @JoinColumn({name: 'id_modelo'})
    modelo: number;

    @OneToOne(type => tb_tipo_comando, tipo_comando => tipo_comando.comando2)
    @JoinColumn({name: 'id_tipo_comando'})
    tipo_comando: number;
}