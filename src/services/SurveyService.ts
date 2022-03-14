import {Types} from 'mongoose';
import { Survey, SurveyInterface } from '../models/Survey';
import { StoreSurveyInterface, UpdateSurveyInterface } from '../requests/SurveyRequest';

export async function index(id: Types.ObjectId) {

    const survey: Array<SurveyInterface> | null = await Survey.find({adminId:id}); 

    if (!survey) {
        throw new Error("Não há pesquisas cadastradas");
    }

    return survey;
}

export async function store(survey: StoreSurveyInterface) {

    let newSurvey: SurveyInterface = new Survey(survey);

    Survey.create(newSurvey, function (err: any) {
        if (err) {
            throw new Error("Erro ao cadastrar pesquisa");
        }
    });
    return newSurvey._doc;
}

export async function search(search: string) {

    let surveys: Array<SurveyInterface> | null = await Survey.find()
    .or([{_id: search}, { nome: search }]);

    if (!surveys) {
        throw new Error("Pesquisa não encontrada");
    }

    return surveys;
}

export async function update(votingGroup: UpdateSurveyInterface) {

    let storedSurvey = await Survey.findById(votingGroup.id);

    if(!storedSurvey){
        throw new Error("Não autorizado");
    }

    let updatedSurvey = await storedSurvey.updateOne(votingGroup);

    return updatedSurvey;
}

export async function remove(id: Types.ObjectId) {

   let survey = await Survey.findByIdAndDelete(id)

    if (!survey) {
        throw new Error("Pesquisa não encontrada");
    }
 
    return survey;
}