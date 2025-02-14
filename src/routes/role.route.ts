import express from 'express'
import { getRoleHandler, createRoleHandler } from '../controllers/role.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { validate } from '../middlewares/validate'
import { createRoleSchema } from '../schema/role.schema'

const router = express.Router()

router.route('/')
        .get(deserializeUser, getRoleHandler)
        .post(deserializeUser, validate(createRoleSchema) ,createRoleHandler)


export default router