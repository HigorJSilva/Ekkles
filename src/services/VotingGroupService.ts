import {Types} from 'mongoose';
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

export async function search(search: string) {

    let votingGroups: Array<VotingGroupInterface> | null = await VotingGroup.find()
    .or([{_id: search}, { nome: search }]);

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

   let votingGroup = await VotingGroup.findByIdAndDelete(id)

    if (!votingGroup) {
        throw new Error("Grupo não encontrado");
    }
 
    return votingGroup;
}