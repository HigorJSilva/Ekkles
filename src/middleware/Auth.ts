const expressJwt = require('express-jwt');
import { Request, Response, NextFunction  } from "express";

export = authorize;

function authorize(roles: Array<string> | string = []) {

    if (typeof roles === 'string') {  
        roles = [roles];
    }
    return [
         expressJwt( process.env.SECRET ),

        (req: Request, res: Response, next: NextFunction) => {
            if (roles.length && !roles.includes(req.user.role)) {

                return res.status(401).json({ message: 'Não autorizado' });
            }
           
            next();
        }
    ];
}

