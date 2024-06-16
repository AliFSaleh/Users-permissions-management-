import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm'
import model from './mode.entity';
import { RolePermissions } from './role_has_permissions.entity';

@Entity()
export class Role extends model {
    @Column()
    name: string

    @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.role)
    rolePermissions: RolePermissions[]
}