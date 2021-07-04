import { tb_usuario_login } from "src/auth/entity/auth.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class tb_usuario{
    @PrimaryGeneratedColumn({type: "bigint"})
    id_usuario: number;

    @Column({ length: 100})
    nome: string;

    @Column({ length: 100})
    email: string;

    @Column({ length: 20, unique: true })
    cpf_cnpj: string;

    @Column({ type: "tinyint"})
    id_status: number;

    @Column({ type: "tinyint"})
    id_tipo_usuario: number;

    @Column({ length: 500, nullable: true })
    observacao: string;

    @Column({ type: "bigint", nullable: true})
    id_login_insert: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_insert: string;

    @Column({ type: "bigint", nullable: true})
    id_login_update: number;

    @Column({ type: "datetime", nullable: true})
    dt_update: Date;

    // @OneToOne(() => tb_usuario_login, login => login.user)
    // login: tb_usuario_login;
}