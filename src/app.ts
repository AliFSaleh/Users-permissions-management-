import express from 'express'
import { Request, Response, NextFunction } from 'express'

import validateEnv from './utils/validateEnv'
import { AppDataSource } from './utils/data-source'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import AppError from './utils/appError'

import authRouter from './routes/auth.route'
import userRouter from './routes/user.route'
import roleRouter from './routes/role.route'

validateEnv()
AppDataSource.initialize().then(() => {
    const app = express()
    const port = process.env.APP_PORT
    
    app.use(bodyParser.json())
    app.use(cookieParser())

    app.use(cors({
        credentials: true
    }))



    // Your routes
    app.use('/api/auth', authRouter)
    app.use('/api/users', userRouter)
    app.use('/api/roles', roleRouter)
    





    
    // Error Handling
    app.use('*', (req: Request, res:Response, next:NextFunction)=>{
        console.log(req.originalUrl);
        
        next (new AppError(404, `Route ${req.originalUrl} not found`))
    })

    app.use(
        (error: AppError, req: Request, res:Response, next:NextFunction) => {
            error.status= error.status || 'error'
            error.statusCode= error.statusCode || 500

            res.status(error.statusCode).json({
                status: error.status,
                message: error.message
            })
        }
    )

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
})