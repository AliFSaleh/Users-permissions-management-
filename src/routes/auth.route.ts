import express from 'express'
import { deserializeUser } from '../middlewares/deserializeUser'
import { login, registerHandler } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate'
import { createUserSchema } from '../schemas/user.schema'


const router = express.Router()

router.route('/register')
        .post(validate(createUserSchema), registerHandler)

router.route('/login')
        .post(login)

router.route('/logout')
        .post(deserializeUser)

export default router