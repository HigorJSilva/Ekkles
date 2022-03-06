import {Model} from "mongoose";
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