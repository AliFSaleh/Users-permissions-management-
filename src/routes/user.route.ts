import express from 'express'
import { getMeHandler } from '../controllers/user.controller'
import { deserializeUser } from '../middlewares/deserializeUser'

const router = express.Router()

router.route('/me')
        .get(deserializeUser ,getMeHandler)

export default router