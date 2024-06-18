import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from './roles.entity'
import { User } from './user.entity'

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @OneToOne(() => User, (user) => user.userRole)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToOne(() => Role, (role) => role.userRole)
    @JoinColumn({name: 'role_id'})
    role: Role

    @Column('uuid')
    user_id: string;

    @Column('uuid')
    role_id: string;
}