import { NextFunction } from 'express';
import mongoose, { Schema, Types, Model} from 'mongoose';

interface MongoResult<T> extends mongoose.Document{
  _doc: T
}

export interface VotingGroupInterface extends MongoResult<VotingGroupInterface>{
  _id: Types.ObjectId;
  nome: string;
  adminId: Schema.Types.ObjectId;
  usersId: Array<Schema.Types.ObjectId>;
}
interface VotingGroupModelInterface extends Model<VotingGroupInterface> {
  buildQueryParams(search: string): any;
}

const VotingGroupSchema = new Schema<VotingGroupInterface>({
  nome: { type: String, required: true, min: 4, },
  adminId: { type: Schema.Types.ObjectId, ref : 'User', required: true}, 
  usersId: [{ type: Schema.Types.ObjectId, ref : 'User'}],

});

VotingGroupSchema.statics.buildQueryParams = function (search) {
  return {nome: {$regex: search }}
}

const populateFields = function(this: Model<VotingGroupModelInterface>, next: NextFunction) {
  this.populate('adminId', '_id nome email');
  this.populate('usersId', '_id nome');
  next();
};

//@ts-ignore
VotingGroupSchema.pre('findOne', populateFields).pre('find', populateFields);

export const VotingGroup = mongoose.model<VotingGroupInterface, VotingGroupModelInterface >('VotingGroup', VotingGroupSchema);