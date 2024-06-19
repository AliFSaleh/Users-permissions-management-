import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import model from './mode.entity';
import { Permission } from './permissions.entity';
import { User } from './user.entity';

@Entity()
export class Role extends model {
    @Column()
    name: string

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: Permission[];

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    users: User[];
}