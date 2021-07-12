import { tb_usuario } from "src/user/entity/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
 

@Index(["email", "cpf_cnpj"], {unique: true})

@Entity()
export class tb_usuario_login{
    @PrimaryGeneratedColumn({type: "bigint"})
    id_usuario_login: number;

    @Column({ type: "tinyint", default: 1})
    id_status: number;

    @Column({ length: 20 })
    cpf_cnpj: string; 

    @Column({type: 'int', default: 0})
    confirm_email: number;
    
    @Column({ length: 500, nullable: true})
    tokenConfirm: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_token_validation: Date;

    @Column({ type: "tinyint"})
    id_tipo_login: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 100 })
    password: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 500, nullable: true })
    observacao: string;

    @Column({ type: "bigint", nullable: true})
    id_login_insert: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_insert: string;

    @Column({ type: "bigint", nullable: true})
    id_login_update: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    dt_update: string;

    @Column({ type: "text", nullable: true})
    telefone: string;

    @Column({ type: "date", nullable: true})
    dt_nascimento: Date; 
 
    // @Column({ type: "bigint", nullable: true})
    // id_tipo_usuario: number;

    

    // @Column({ length: 20, unique: true })
    // cpf_cnpj: string; 

    // @OneToOne(() => tb_usuario, user => user.user)
    // user_login: tb_usuario;
}