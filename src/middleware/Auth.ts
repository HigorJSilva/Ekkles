import expressJwt from 'express-jwt';
import { Request, Response, NextFunction  } from "express";
import { User, UserInterface } from '../models/User';
import errorHandler from '../helpers/ErrorHandler';



export function authorize(roles: Array<string> | string = []) {

    if (typeof roles === 'string') {  
        roles = [roles];
        
    }

    return [
         expressJwt({
            secret: process.env.SECRET,
            algorithms: ['HS256']
        }),

        async (req: Request, res: Response, next: NextFunction) => {

            const user: UserInterface | null = await User.findById(req.user?.id);
            if(!user){
                return errorHandler({name: 'UnauthenticatedError', message: ''}, req, res , next);
            }
            //@ts-ignore
            req.params.user ={id: user.id}

            if (roles.length && !roles.includes(user.role)) {
                return errorHandler({name: 'UnauthorizedError', message: ''}, req, res , next);
            }
           
            next();
        }
    ];
}

