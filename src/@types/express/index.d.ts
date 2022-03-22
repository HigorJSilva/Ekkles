import * as express from "express"
import {Types} from "mongoose";
declare global {
    namespace Express {
        interface Request {
            user : {
                id: Types.ObjectId
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
        CLUSTER: string;
        DATABASE: string;
      }
    }
  }