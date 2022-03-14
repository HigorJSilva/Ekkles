import { NOMEM } from "dns";
import mongoose, {Schema, Types} from "mongoose";

interface MongoResult<T> extends mongoose.Document{
  _doc: T
}

export interface SurveyOptionsInterface {
  titulo: string,
  opcao: string
}

export interface SurveyInterface extends MongoResult<SurveyInterface> {
  nome: string,
  votingGroup: Types.ObjectId,
  opcoes: [SurveyOptionsInterface],
}

const SurveyOptionsSchema =  new Schema<SurveyOptionsInterface> ({
  titulo: {type: String, required: true, min: 4 },
  opcao:  {type: String, required: true, min: 2 },
  
});

const SurveySchema =  new Schema<SurveyInterface> ({
  nome: { type: String, required: true, min: 4 },
  votingGroup: { type: Schema.Types.ObjectId, ref : 'VotingGroup', required: true},
  opcoes:[{type:SurveyOptionsSchema, required: true}],

});


export const Survey = mongoose.model<SurveyInterface>('Survey', SurveySchema);