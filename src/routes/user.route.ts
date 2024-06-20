import express from 'express'
import { createUserHandler, getMeHandler } from '../controllers/user.controller'
import { deserializeUser } from '../middlewares/deserializeUser'
import { validate } from '../middlewares/validate'
import { createUserSchema } from '../schema/user.schema'

const router = express.Router()

router.route('/')
        .post(deserializeUser, validate(createUserSchema), createUserHandler)

router.route('/me')
        .get(deserializeUser ,getMeHandler)

export default router