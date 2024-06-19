import { Request, Response, NextFunction } from "express"
import { createRole, getRoles } from "../services/role.service"

export const getRoleHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const roles = await getRoles()

    res.status(200).json({
        status: "SUCCESS",
        data: {
            roles
        }
    })
}

export const createRoleHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await createRole(req.body)

    res.status(200).json({
        status: "SUCCESS",
        data: null
    })
}