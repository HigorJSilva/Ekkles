import { Request, Response, NextFunction  } from "express";
import { ApiResponse } from "./Response";

export = errorHandler;

function errorHandler(err: TypeError, req: Request, res: Response, next: NextFunction) {

    if (err.name === 'UnauthorizedError') {
        res.status(401).json( 
            new ApiResponse(
                false,
                'Usuário não autenticado',
                null,
                null
            )
        )
        return;
    }

    next();
}