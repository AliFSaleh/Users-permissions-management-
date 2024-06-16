import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Role } from './roles.entity'
import { Permission } from './permissions.entity'

@Entity()
export class RolePermissions {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Role, (role) => role.rolePermissions)
    @JoinColumn({name: 'role_id'})
    role: Role

    @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
    @JoinColumn({name: 'permission_id'})
    permission: Permission

    @Column('uuid')
    role_id: string;

    @Column('uuid')
    permission_id: string;
}