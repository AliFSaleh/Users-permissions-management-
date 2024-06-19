import {Request, Response, NextFunction} from 'express'
import { getMe } from '../services/user.service';

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