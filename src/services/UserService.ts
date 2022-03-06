const secret = process.env.SECRET;
import {Types} from "mongoose";
import * as bcrypt from 'bcrypt';
import {User, UserInterface} from '../models/User';
import { UpdateInterface } from '../requests/UserRequests';

//@ts-ignore
const users: Array<UserInterface>  = User.find();

export async function update(user: UpdateInterface, id: string) {

    
   let updatedUser: any = await User.findOneAndUpdate({ _id: id}, user, {new: true} );

    if (!updatedUser) {
        throw new Error("Usuário não encontrado");
    }

    const { senha, role, ...protectedUser  } = updatedUser._doc;
    return protectedUser;
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