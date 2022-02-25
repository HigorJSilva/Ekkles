import mongoose, { Schema, Types} from 'mongoose';

export interface UserInterface extends mongoose.Document{
  _id: Types.ObjectId;
  nome: string;
  email: string;
  senha: string;
  role: string;
}

const UserSchema = new Schema<UserInterface>({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  role: { type: String, required: false },
});


export const User = mongoose.model<UserInterface>('User', UserSchema);