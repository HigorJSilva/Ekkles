const secret = process.env.SECRET;
import {Types} from "mongoose";
import * as bcrypt from 'bcrypt';
import {User, UserInterface} from '../models/User';
import { UpdateInterface } from '../requests/UserRequests';

//@ts-ignore
const users: Array<UserInterface>  = User.find();

export async function me(id: string) {

    
    let user: any = await User.findById({ _id: id});

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const { senha, role, ...protectedUser  } = user._doc;
    return protectedUser;
}


export async function update(user: UpdateInterface, id: string) {

    
   let updatedUser: any = await User.findOneAndUpdate({ _id: id}, user, {new: true} );

    if (!updatedUser) {
        throw new Error("Usuário não encontrado");
    }

    const { senha, role, ...protectedUser  } = updatedUser._doc;
    return protectedUser;
}

export async function remove(user: UpdateInterface, id: string) {

    let removedUser: any = await User.findByIdAndDelete({ _id: id} );
 
    if (!removedUser) {
        throw new Error("Usuário não encontrado");
    }
 
    return true;
}

async function getAll() {
    return users.map((user: UserInterface) => {
        const { senha, role, ...protectedUser } = user;
        return protectedUser;
    });
}

async function getById(id: UserInterface["_id"]) {
    const user:  any = await User.find((u: UserInterface) => u._id === id);
    if (!user) return;
    const { senha, role, ...protectedUser } = user;
    return protectedUser;
}