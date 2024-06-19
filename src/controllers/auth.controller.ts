import { Request, Response, NextFunction, CookieOptions } from "express";
import { User } from "../entities/user.entity";
import { signJWT } from "../utils/jwt";
import config from 'config'
import { 
    createNewUser,
    findUserByEmail,
    findUserById
} from "../services/user.service";
import AppError from "../utils/appError";
import { AppDataSource } from "../utils/data-source";
import { Token } from "../entities/personal_access_tokens.entity";

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
      Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(
      Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

export const registerHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {        
        const {name, email, password} = req.body;
        
        const newUser = await createNewUser({
            name,
            email: email,
            password
        });
   
        const {verificationCode, hashedVerificationCode} = User.createVerificationCode()
        newUser.verificationCode = hashedVerificationCode;
        await newUser.save();

        res.status(201).json({
            status: 'success',
            message:
              'User account created successfully!',
          });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
              status: 'fail',
              message: 'User with that email already exist',
            });
          }
          next(err);
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tokenRepository = AppDataSource.getRepository(Token)
        const {email, password} = req.body
        const user = await findUserByEmail({ email });

        if(!user){
            return next(new AppError(400, 'Invalid email or password'))
        }

        if(!(await User.comparePassword(password, user.password))){
            return next(new AppError(400, 'Invalid email or password'))
        }

        const access_token = signJWT({sub: user.id}, {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
        })
        const refresh_token = signJWT({sub: user.id}, {
            expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
        })

        res.cookie('access_token', access_token, accessTokenCookieOptions)
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        await tokenRepository.save(tokenRepository.create({
            user, token: access_token
        }))

        res.status(200).json({
            status: "SUCCESS",
            access_token
        })
    } catch (err: any) {
        next(err)
    }
}

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await findUserById(res.locals.userId)

    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });

    res.status(200).json({
        status: "SUCCESS"
    })
}