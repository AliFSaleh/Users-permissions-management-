import { Request, Response, NextFunction } from "express"
import { createRole } from "../services/role.service"

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