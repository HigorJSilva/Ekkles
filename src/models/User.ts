import mongoose, { Schema, Types} from 'mongoose';

export interface UserInterface extends mongoose.Document{
  _id: Types.ObjectId;
  nome: string;
  email: string;
  senha: string;
  role: string;
  idade: number;
  estado: string;
  genero: string;
}

const UserSchema = new Schema<UserInterface>({
  nome: { type: String, required: true, min: 4, },
  email: { type: String, required: true },
  senha: { type: String, required: true, min: 5, },
  role:  { type: String, required: false },
  idade: { type: Number, required: true },
  estado: { type: String, required: true },
  genero: { type: String, required: true },
});


export const User = mongoose.model<UserInterface>('User', UserSchema);