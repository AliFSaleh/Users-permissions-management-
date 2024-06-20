import { Request, Response, NextFunction } from "express"
import AppError from "../utils/appError"
import { getMe } from "../services/user.service"

export const hasPermission = 
    (...permissions: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.userId
        const user = await getMe(userId)
        const userRoles = user?.roles

        let pass = false

        for (const userRole of userRoles!) {
            let userPermissions = userRole.permissions
            for (const userPermission of userPermissions){                
                pass = permissions.includes(userPermission.name)? true : false
                if(pass)
                    next()
            }
        }

        return next(new AppError(404, 'This action is not authorized!'))
    }