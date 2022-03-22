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
    .find(query);

    if (!votingGroups) {
        throw new Error("Grupo não encontrado");
    }

    return votingGroups;
}

export async function update(votingGroup: UpdateVotingGroupInterface) {

    let storedVotingGroup = <UpdateVotingGroupInterface> <unknown> await VotingGroup.findById(votingGroup.id);

    if(!storedVotingGroup || storedVotingGroup?.adminId._id != votingGroup.user.id ){
        throw new Error("Não autorizado");
    }

    let updatedVotingGroup = await VotingGroup.findByIdAndUpdate(storedVotingGroup._id, votingGroup, {lean: true});

    return updatedVotingGroup;
}

export async function remove(id: Types.ObjectId) {

    let votingGroup = await VotingGroup.findById(id)

    let surveys = await Survey.find({votingGroup:id})

    if(surveys.length > 0){
        throw new Error("Exitem pesquisas ligadas a esse grupo");
    }
 
    return votingGroup;
}