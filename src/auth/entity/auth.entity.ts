import { tb_usuario } from "src/user/entity/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_usuario_login{
    @PrimaryGeneratedColumn({type: "bigint"})
    id_usuario_login: number;

    @Column({ type: "tinyint", default: 1})
    id_status: number;

    @Column({type: 'int', default: 0})
    confirm_email: number;
    
    @Column({nullable: true})
    tokenConfirm: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_token_validation: Date;

    @Column({ type: "tinyint"})
    id_tipo_login: number;

    @Column({ length: 20 })
    login: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 500, nullable: true })
    observacao: string;

    @Column({ type: "bigint", nullable: true})
    id_login_insert: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_insert: string;

    @Column({ type: "bigint", nullable: true})
    id_login_update: number;

    @Column({ type: "datetime", nullable: true})
    dt_update: string;

    @OneToOne(() => tb_usuario, user => user.login)
    user: tb_usuario;
}