import * as express from "express"
import {Types} from "mongoose";
declare global {
    namespace Express {
        interface Request {
            user : {
                _id: Types.ObjectId
                role: string
            }
        }
    }
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SECRET: string;
        USUARIO: STRING
        SENHA: string;
        DATABASE: string;
      }
    }
  }