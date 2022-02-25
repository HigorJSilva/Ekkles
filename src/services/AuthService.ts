const secret = process.env.SECRET;
import jwt from 'jsonwebtoken';
// import authorize from '../middleware/Auth';
import {User, UserInterface} from '../models/User';

//@ts-ignore
const users: Array<UserInterface>  = User.find();

interface ProtectedUserInterface {
    user: {
        nome: String,
        email: String,
    }
    token: String,

}

export {
    authenticate,
    getAll,
    getById,
    store,
};

async function authenticate(email: String, senha: String) {
    const user: (UserInterface | undefined) = users.find((u: UserInterface) => u.email === email && u.senha === senha);
    if (user) {
        const token = jwt.sign({ sub: user._id, role: user.role }, secret);
        const { senha, role, ...protectedUser } = user;
        return {
            ...protectedUser,
            token
        };
    }
}

async function store(user: UserInterface) {
    return 'ok';
}

async function getAll() {
    return users.map((user: UserInterface) => {
        const { senha, role, ...protectedUser } = user;
        return protectedUser;
    });
}

async function getById(id: UserInterface["_id"]) {
    const user:  (UserInterface | undefined) = users.find((u: UserInterface) => u._id === id);
    if (!user) return;
    const { senha, role, ...protectedUser } = user;
    return protectedUser;
}