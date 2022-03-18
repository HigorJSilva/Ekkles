import {Types} from 'mongoose';
import { Survey } from '../models/Survey';
import { VotingGroup, VotingGroupInterface } from '../models/VotingGroup';
import { StoreVotingGroupInterface, UpdateVotingGroupInterface } from '../requests/VotingGroupRequest';

export async function index(id: Types.ObjectId) {

    const votingGroups: Array<VotingGroupInterface> | null = await VotingGroup.find({adminId:id}); 

    if (!votingGroups) {
        throw new Error("Não há grupos cadastrados");
    }

    return votingGroups;
}

export async function store(votingGroup: StoreVotingGroupInterface) {

    let newVotingGroup: VotingGroupInterface = new VotingGroup(votingGroup);

    newVotingGroup.adminId = votingGroup.user.id;
    VotingGroup.create(newVotingGroup, function (err: any) {
        if (err) {
            throw new Error("Erro ao cadastrar grupo");
        }
    });
    return newVotingGroup._doc;
}

export async function search(adminId: Types.ObjectId, search: string) {
    
    const query = Types.ObjectId.isValid(search) ? {_id: search} : VotingGroup.buildQueryParams(search)
    let votingGroups: Array<VotingGroupInterface> | null = await VotingGroup.find({adminId:adminId})
    .or([{$regex: '.*' + query + '.*' }]);

    if (!votingGroups) {
        throw new Error("Grupo não encontrado");
    }

    return votingGroups;
}

export async function update(votingGroup: UpdateVotingGroupInterface) {

    let storedVotingGroup = await VotingGroup.findById(votingGroup.id);

    if(!storedVotingGroup || storedVotingGroup?.adminId != votingGroup.user.id ){
        throw new Error("Não autorizado");
    }

    let updatedVotingGroup = await storedVotingGroup.updateOne(votingGroup);

    return updatedVotingGroup;
}

export async function remove(id: Types.ObjectId) {

    let votingGroup = await VotingGroup.findById(id)

    let surveys = await Survey.find({votingGroup:id})

    if(surveys.length > 0){
        throw new Error("Exitem pesquisas ligadas a esse grupo");
    }

    if (!votingGroup) {
        throw new Error("Grupo não encontrado");
    }
 
    return votingGroup;
}