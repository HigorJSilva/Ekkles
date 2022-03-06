import expressJwt from 'express-jwt';
import { Request, Response, NextFunction  } from "express";
import { User } from '../models/User';



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
            //@ts-ignore
            const user = await User.findById(req.user.id);
            if(!user){
                throw new Error("Usuário não autenticado");
            }
             //@ts-ignore
            req.params.user ={id: user.id}
            
            if (roles.length && !roles.includes(user.role)) {
                return res.status(401).json({ message: 'Usuário não autorizado' });
            }
           
            next();
        }
    ];
}

