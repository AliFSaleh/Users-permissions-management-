import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import model from './mode.entity';
// import { RolePermissions } from './role_has_permissions.entity';
import { Role } from './roles.entity';

@Entity()
export class Permission extends model {
    @Column()
    name: string

    // @OneToMany(() => RolePermissions, rolePermissions => rolePermissions.permission)
    // rolePermissions: RolePermissions[]

    // Many-to-Many relationship with Role entity
    @ManyToMany(() => Role, role => role.permissions)
    @JoinTable({
        name: 'role_permissions', // Name of the junction table
        joinColumn: { name: 'permission_id', referencedColumnName: 'id' }, // Column in junction table referencing Permission
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }, // Column in junction table referencing Role
    })
    roles: Role[];
} 