import {Types} from 'mongoose';
import { VotingGroup, VotingGroupInterface } from '../models/VotingGroup';
import { StoreVotingGroupInterface } from '../requests/VotingGroupRequest';

export async function index(id: Types.ObjectId) {

    const votingGroups: Array<VotingGroupInterface> | null = await VotingGroup.find({adminId:id}); 

    if (!votingGroups) {
        throw new Error("Não há grupos cadastrados");
    }

    return votingGroups;
}

export async function store(votingGroup: StoreVotingGroupInterface) {

    const newVotingGroup: VotingGroupInterface = new VotingGroup(votingGroup);

    VotingGroup.create(newVotingGroup, function (err: any) {
        if (err) {
            console.log('err.message :>> ', err.message);
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


// export async function update(user: UpdateInterface, id: string) {

    
//    let updatedUser: any = await User.findOneAndUpdate({ _id: id}, user, {new: true} );

//     if (!updatedUser) {
//         throw new Error("Usuário não encontrado");
//     }

//     const { senha, role, ...protectedUser  } = updatedUser._doc;
//     return protectedUser;
// }

// export async function remove(user: UpdateInterface, id: string) {

//     let removedUser: any = await User.findByIdAndDelete({ _id: id} );
 
//     if (!removedUser) {
//         throw new Error("Usuário não encontrado");
//     }
 
//     return true;
// }