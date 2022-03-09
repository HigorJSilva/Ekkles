import mongoose, { Schema, Types} from 'mongoose';

interface MongoResult<T> extends mongoose.Document{
  _doc: T
}

export interface VotingGroupInterface extends MongoResult<VotingGroupInterface>{
  _id: Types.ObjectId;
  nome: string;
  adminId: Types.ObjectId;
  usersId: Array<Types.ObjectId>;
}

const VotingGroupSchema = new Schema<VotingGroupInterface>({
  nome: { type: String, required: true, min: 4, },
  adminId: [{ type: Schema.Types.ObjectId, ref : 'User', required: true}], 
  usersId: [{ type: Schema.Types.ObjectId, ref : 'User'}],

});

export const VotingGroup = mongoose.model<VotingGroupInterface>('VotingGroup', VotingGroupSchema);