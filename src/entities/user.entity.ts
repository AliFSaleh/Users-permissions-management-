import {
    BeforeInsert,
    Column,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToOne
} from "typeorm";
import model from "./mode.entity";
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Token } from "./personal_access_tokens.entity";
import { Role } from "./roles.entity";

@Entity()
export class User extends model {
    @Column()
    name: string

    @Index('email_index')
    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({
        default: 'default.png'
    })
    photo: string

    @Column({
        default: false
    })
    verified: boolean

    @Column({
        type: 'text',
        nullable: true
    })
    verificationCode!: string | null

    @OneToOne(() => Token, (token) => token.user)
    token: Token

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Role[];

    @BeforeInsert()
    async hashPassword () {
        this.password = await bcrypt.hash(this.password, 25)
    }

    static async comparePassword(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword)
    }

    static createVerificationCode () {
        const verificationCode = crypto.randomBytes(32).toString('hex');

        const hashedVerificationCode = crypto
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex')

        return { verificationCode, hashedVerificationCode };
    }

    toJson() {
        return {
            ...this,
            password: undefined,
            verified: undefined,
            verificationCode: undefined
        }
    }
}