import { NextFunction } from "express";
import mongoose, {Schema, Types, Model} from "mongoose";

interface MongoResult<T> extends mongoose.Document{
  _doc: T
}

export interface SurveyOptionsInterface extends Types.Subdocument {
  titulo: string,
}

export interface SurveyInterface extends MongoResult<SurveyInterface> {
  nome: string,
  votingGroup: Types.ObjectId,
  opcoes: Types.DocumentArray<SurveyOptionsInterface & mongoose.Document>
  dataFim: Date
}

interface VotingGroupModelInterface extends Model<SurveyInterface> {
  buildQueryParams(search: string): any;
}

const SurveyOptionsSchema =  new Schema<SurveyOptionsInterface> ({
  titulo: {type: String, required: true, min: 4 },
});

const SurveySchema =  new Schema<SurveyInterface> ({
  nome: { type: String, required: true, min: 4 },
  votingGroup: { type: Schema.Types.ObjectId, ref : 'VotingGroup', required: true},
  opcoes:[{type:SurveyOptionsSchema, required: true}],
  dataFim: { type: Date, required: true},
});

SurveySchema.statics.buildQueryParams = function (search) {
  return {nome: search}
}

const populateFields = function(this: Model<SurveyInterface>, next: NextFunction) {
  this.populate('votingGroup', '_id nome usersIds');
  next();
};

//@ts-ignore
SurveySchema.pre('findOne', populateFields).pre('find', populateFields);

export const Survey = mongoose.model<SurveyInterface, VotingGroupModelInterface>('Survey', SurveySchema);