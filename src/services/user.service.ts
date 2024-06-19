import { User } from "../entities/user.entity";
import { AppDataSource } from "../utils/data-source";

const userRepository = AppDataSource.getRepository(User);

export const findUserByEmail = async ({email}: {email: string}) => {
    return await userRepository.findOneBy({email})
}

export const findUserById = async ({id}: {id: string}) => {
    return await userRepository.findOneBy({id})
}

export const createNewUser = async (input: Partial<User>) => {
    return await userRepository.save(userRepository.create(input))
}

export const findUser = (query: Object) => {
    return userRepository.findOneBy(query)
}

export const getMe = async ({id}: {id:string}) => {
    return await userRepository.findOne({
        where: {id},
        relations: ['roles', 'roles.permissions']
    })
}