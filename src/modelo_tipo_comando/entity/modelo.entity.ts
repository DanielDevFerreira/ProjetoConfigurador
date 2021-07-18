import { tb_comando } from "src/comando/entity/comando.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_modelo_tipo_comando extends BaseEntity{

  @PrimaryGeneratedColumn()
    id_modelo_tipo_comando: number
    
    @Column()
    id_tipo_comando: number;
    
    @Column()
    id_modelo: number;

//     @OneToOne(type => tb_comando, comando => comando.modelo_tipo_comando)
//     comando: number;
}