import {Types} from 'mongoose';
import { Survey, SurveyInterface } from '../models/Survey';
import * as _ from 'lodash';
import { Votes } from '../models/Votes';
import { StoreSurveyInterface, UpdateSurveyInterface } from '../requests/SurveyRequest';
import { StoreVotesInterface, GetVoteInterface } from '../requests/VoteRequest';
import { VotingGroup, VotingGroupInterface } from '../models/VotingGroup';
import { User } from '../models/User';
import { Roles } from '../helpers/Roles';

export async function index(id: Types.ObjectId) {

    const user = await User.findById(id);
    let query = user!.role == Roles.Admin ? {adminId:id} : {adminId:user?.adminId}

    let votingGroups  = await VotingGroup.find(query)
    let survey = await Survey.find({'votingGroup': {"$in": _.map(votingGroups, '_id') }});

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

    const user = await User.findById(adminId);
    let admin = user!.role == Roles.Admin ? {adminId:adminId} : {adminId:user?.adminId}

    let votingGroups  = await VotingGroup.find(admin)

    let surveys: Array<SurveyInterface> | null = await Survey.find({
        'votingGroup': {"$in": _.map(votingGroups, '_id') },
    }).find(query);

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

export async function vote(vote: StoreVotesInterface) {

    let survey = await Survey.findById(vote.id).populate({
        path: 'votingGroup',
    });

    if (!survey) {
        throw new Error("Pesquisa não encontrada");
    }

    const users = (<VotingGroupInterface> <unknown>survey.votingGroup).usersId;
    
    if(!users.includes(vote.user.id)){
        throw new Error("Usuário não autorizado a responder a pesquisa");
    }

    let opcoes = survey.opcoes.id(vote.optionId);

    if(!opcoes){
        throw new Error("Opção não encontrada");
    }

    let result = await Votes
        .where({userId: vote.user.id})
        .where('optionId').in(_.map(Array(opcoes), '_id'))
        .exec();
    
    if(result.length){
        throw new Error("Usuário já participou da pesquisa");
    } 
        
    let newVote = await Votes.create({
        optionId: vote.optionId,
        userId: vote.user.id,
    })
 
    if (!newVote) {
        throw new Error("Não foi possivel computar seu voto");
    }
  
    return newVote;
}

export async function getVoteResult(vote: GetVoteInterface) {

    let survey = await Survey.findById(vote.id);

    if (!survey) {
        throw new Error("Pesquisa não encontrada");
    }

    let result = await Votes.aggregate([
        {$match:{ "optionId": { "$in": _.map(survey.opcoes, '_id')}}},
        {$unwind: '$optionId'},
        {$group: {_id: '$optionId', count:{$sum:1}}}
    ])

    result.forEach(element => {
        element.nome = _.find(survey!.opcoes, {_id: element._id})?.titulo
    });
    
    return result;
}