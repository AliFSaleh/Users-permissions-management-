import { In } from "typeorm";
import { Permission } from "../entities/permissions.entity";
import { Role } from "../entities/roles.entity";
import { AppDataSource } from "../utils/data-source";

const roleRepository = AppDataSource.getRepository(Role)
const permissionRepository = AppDataSource.getRepository(Permission)

export const getRoles = async () => {
    return await roleRepository.find()
}

export const getRoleById = async ({id}: {id: string}) => {
    return await roleRepository.findOneBy({id})
}

export const createRole = async (input: any) => {
    const permissions = await permissionRepository.findBy({id: In(input.permissionIds)})

    const newRole = new Role()
    newRole.name = input.name
    newRole.permissions = permissions

    newRole.save()
}