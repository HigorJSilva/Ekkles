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
    const newUser:any = new User(user)
    //@ts-ignore
    user?.codigo === process.env.ADMIN_CODE ? newUser.role = 'Admin' : newUser.role = 'User';
    
    User.create(newUser, function (err: any) {
        if (err) {
            throw new Error(err);
        }
    });
    const { senha, role, ...protectedUser  } = newUser._doc;
    return protectedUser;
   
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