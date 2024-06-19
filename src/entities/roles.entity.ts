import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import model from './mode.entity';
// import { RolePermissions } from './role_has_permissions.entity';
import { UserRole } from './user_has_role.entity';
import { Permission } from './permissions.entity';

@Entity()
export class Role extends model {
    @Column()
    name: string

    // @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.role)
    // rolePermissions: RolePermissions[]

    // Many-to-Many relationship with Permission entity
    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: 'role_permissions', // Name of the junction table
        joinColumn: { name: 'role_id', referencedColumnName: 'id' }, // Column in junction table referencing Role
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }, // Column in junction table referencing Permission
    })
    permissions: Permission[];

    @OneToMany(() => UserRole, (userRole) => userRole.role)
    userRole: UserRole[]
}