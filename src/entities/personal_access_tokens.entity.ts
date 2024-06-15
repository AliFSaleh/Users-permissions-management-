import {
    Entity,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm'
import model from './mode.entity';
import { User } from './user.entity';

@Entity()
export class Token extends model {
    @OneToOne(() => User, (user) => user.token)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column()
    token: string

    @Column({
        default: false
    })
    expired: boolean
}