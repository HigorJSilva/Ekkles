import { NextFunction, Request, Response} from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '../helpers/Response';
import * as _ from "lodash";
import { handleErrorMessage } from '../helpers/HandleErrorMessages';

export function validateRequest (
    req: Request,
    res: Response,
    next: NextFunction,
){
    const errors = validationResult(req) ;
    if(!errors.isEmpty()){

      let errorsArray = handleErrorMessage(errors.array())

      res.status(422).json( new ApiResponse(false, 'Falha na requisição', null, errorsArray))
      return;
    }

    next();
}