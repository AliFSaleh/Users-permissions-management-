import { Permission } from "../entities/permissions.entity";
import { AppDataSource } from "../utils/data-source";

const permissionRepository = AppDataSource.getRepository(Permission)

export const getPermission = async () => {
    return await permissionRepository.find()
}

export const getPermissionById = async ({id}: {id: string}) => {
    return await permissionRepository.findOneBy({id})
}