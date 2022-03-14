import {Model, Types} from "mongoose";
import errorHandler from "../../helpers/ErrorHandler";
import { existsMessage, uniqueMessage } from "../../helpers/ErrorsMessages";

export function inArray(value: string, array: Array<any> , key?: string){
    if(key){
        return Object.values(array).some(function(k) { return k[key] == value; });
    }else{
        return array.includes(value)
    }
}

export async function unique(value: string, key: string, model: Model<any>){

    let emailCheck = await model.findOne({[key]: value});
    
    return emailCheck !== null ? Promise.reject() : true
}

export async function exists(value: Array<string>, model: Model<any>){
    let response = await model.find().where('_id').in(value).exec();
    if(!response || response.length < value.length){
        return Promise.reject(uniqueMessage)
    }
    return true
}