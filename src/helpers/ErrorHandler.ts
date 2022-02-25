import { Request, Response, NextFunction  } from "express";

module.exports = errorHandler;

function errorHandler(err: TypeError, req: Request, res: Response, next: NextFunction) {
    if (typeof (err) === 'string') {

        return res.status(400).json({ message: err });
    }

    if (err.name === 'NaoAutorizado') {
        return res.status(401).json({ message: 'Token inválido' });
    }

    return res.status(500).json({ message: err.message });
}