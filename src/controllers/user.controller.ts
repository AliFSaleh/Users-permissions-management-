import {Request, Response, NextFunction} from 'express'
import { createNewUser, getMe } from '../services/user.service';
import { getRoleById } from '../services/role.service';
import AppError from '../utils/appError';
import { User } from '../entities/user.entity';

export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {       
      const userId = res.locals.userId;
      const user = await getMe(userId)
  
      res.status(200).status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (err: any) {
      next(err);
    }
};

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {name, email, password, roleId} = req.body
  const role = await getRoleById(roleId)
  if(!role){
    return next(new AppError(400, 'Selected role id is not valid'))
  }

  const createdUser = await createNewUser({
    name, email, password
  }, role)
  
  console.log(createdUser);
  
  res.status(200).json({
    status: "SUCCESS",
    data: {
      user: createdUser
    }
  })
};