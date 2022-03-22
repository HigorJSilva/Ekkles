import {Model} from "mongoose";
import { uniqueMessage } from "../../helpers/ErrorsMessages";
import { Survey, SurveyInterface } from "../../models/Survey";
import { Types } from "mongoose";
import { User } from "../../models/User";
import { Roles } from "../../helpers/Roles";
import { VotingGroupInterface } from "../../models/VotingGroup";

type SurveyPopulatedInterface = {votingGroup: SurveyInterface & VotingGroupInterface }

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

export async function exists(value: Array<string>, model: Model<any>, userId: string){
    let response = await model.find().where({adminId: userId}).where('_id').in(value).exec();
    if(!response || response.length < value.length){
        return Promise.reject(uniqueMessage)
    }
    return true
}

export function isFutureDate(date: string){
    let enteredDate = new Date(date);
    let todaysDate = new Date();
   
    return enteredDate > todaysDate ? true :  false;
}

export async function checkSurveyEndDate(surveyId: Types.ObjectId){
    let survey = await Survey.findById(surveyId);

    let surveyEndDate = new Date(survey!.dataFim);
    let todaysDate = new Date();

    return surveyEndDate > todaysDate ? true : Promise.reject();
}
    
export async function votingAuthRule(userId: Types.ObjectId, surveyId: Types.ObjectId){
    let user = await User.findById(userId);

    if(!user){
        Promise.reject();
    }

    let adminId: Types.ObjectId = user!.role === Roles.Admin 
        ? user!._id
        : user!.adminId;

    let survey: SurveyPopulatedInterface | null =  await Survey.findById(surveyId);
    if(!survey ||  (<SurveyInterface> <unknown> survey?.votingGroup.adminId)._id.toString() !== adminId.toString()){
        return Promise.reject();
    }

    return true;
}
