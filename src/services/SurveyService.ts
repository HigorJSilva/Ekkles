import {Types} from 'mongoose';
import { Survey, SurveyInterface } from '../models/Survey';
import { Votes } from '../models/Votes';
import { StoreSurveyInterface, UpdateSurveyInterface } from '../requests/SurveyRequest';
import { VotesInterface } from '../requests/VoteRequest';

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

export async function search(adminId: Types.ObjectId ,search: string) {

    const query = Types.ObjectId.isValid(search) ? {_id: search} : Survey.buildQueryParams(search);

    let surveys: Array<SurveyInterface> | null = await Survey.find({adminId:adminId})
    .or([{$regex: '.*' + query + '.*' }]);

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

export async function vote(vote: VotesInterface) {

    let survey = await Survey.findById(vote.id, function (err: any, mama: any) {
        mama.optionIds.id(vote.id);
    });

    if (!survey) {
        throw new Error("Pesquisa não encontrada");
    }

    // await Survey.findById({name: 'Bob'}, function (err, user) {
    //     user.photos.id(photo._id);
    // });

    let newVote = await Votes.create({
        optionId: vote.optionId,
        userId: vote.user.id,
    })
 
     if (!newVote) {
         throw new Error("Não foi possivel computar seu voto");
     }
  
     return newVote;
 }