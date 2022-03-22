import {User, UserInterface} from '../models/User';
import { UpdateInterface } from '../requests/UserRequests';
import { Types } from 'mongoose';


export async function me(id: string) {

    
    let user: UserInterface | null = await User.findById({ _id: id});

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const { senha, role, ...protectedUser  } = user._doc;
    return protectedUser;
}


export async function update(user: UpdateInterface, id: string) {

    
   let updatedUser: UserInterface | null = await User.findOneAndUpdate({ _id: id}, user, {new: true} );

    if (!updatedUser) {
        throw new Error("Usuário não encontrado");
    }

    const { senha, role, ...protectedUser  } = updatedUser._doc;
    return protectedUser;
}

export async function remove(id: string) {

    let removedUser:  UserInterface | null = await User.findByIdAndDelete({ _id: id});
 
    if (!removedUser) {
        throw new Error("Usuário não encontrado");
    }
 
    return true;
}

export async function getAll(adminId: Types.ObjectId) {
    let result = await User.find({adminId: adminId});
    let users: Array<any> = [];
    result.forEach((user: UserInterface) => {
        const { senha, role, ...protectedUser } = user._doc;
        users.push(protectedUser);
    });  
    
    return users;
}

export async function getById(adminId: Types.ObjectId, id: Types.ObjectId) {
    let user = await User.find({_id:id, adminId: adminId});
    if (!user){
        throw new Error("Usuário não encontrado");
    }
    const { senha, role, ...protectedUser } = <UserInterface><unknown>user;
    return protectedUser;
}