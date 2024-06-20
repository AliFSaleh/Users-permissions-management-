import { Request, Response, NextFunction } from "express"
import AppError from "../utils/appError"
import { getMe } from "../services/user.service"

export const hasRole =
    (...role: any) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.userId
        const user = await getMe(userId)
        const userRoles = user?.roles
        
        let pass = false

        for (const userRole of userRoles!) {
            pass = role.includes(userRole.name)? true : false
            if(pass)
                next();
        }

        return next(new AppError(401, 'This action is not authorized!'))
    }