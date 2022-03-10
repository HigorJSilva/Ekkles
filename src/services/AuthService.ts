const secret = process.env.SECRET;
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {User, UserInterface} from '../models/User';
import { LoginInterface, RegisterInterface } from '../requests/AuthRequests';

export async function authenticate(user: LoginInterface) {
    const storedUser: any = await User.findOne({'email': user.email});
    if(!storedUser){
        throw new Error("Usuário não encontrado");
    }
    let checkPassword = bcrypt.compareSync(user.senha, storedUser.senha);

    if (checkPassword) {
        const token = jwt.sign({ id: storedUser._id }, secret);
        const { senha, role, ...protectedUser } = storedUser._doc;
        return {
            user: protectedUser,
            token
        };
    }else{
        throw new Error("Credenciais inválidas");
    }
}

export async function store(user: RegisterInterface) {
    const newUser: UserInterface = new User(user)

    user?.codigo === process.env.ADMIN_CODE ? newUser.role = 'Admin' : newUser.role = 'User';
    newUser.senha = bcrypt.hashSync(user.senha,5);
    User.create(newUser, function (err: any) {
        if (err) {
            throw new Error(err);
        }
    });
    const { senha, role, ...protectedUser  } = newUser._doc;
    return protectedUser;
   
}

// async function getAll() {
//     return users.map((user: UserInterface) => {
//         const { senha, role, ...protectedUser } = user;
//         return protectedUser;
//     });
// }

// async function getById(id: UserInterface["_id"]) {
//     const user:  any = await User.find((u: UserInterface) => u._id === id);
//     if (!user) return;
//     const { senha, role, ...protectedUser } = user;
//     return protectedUser;
// }