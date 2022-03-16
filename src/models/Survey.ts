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

});

SurveySchema.statics.buildQueryParams = function (search) {
  return {nome: search}
}

export const Survey = mongoose.model<SurveyInterface, VotingGroupModelInterface>('Survey', SurveySchema);