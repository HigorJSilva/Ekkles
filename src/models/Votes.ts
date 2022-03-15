import mongoose from "mongoose";
import {Types, Schema} from "mongoose";

interface MongoResult<T> extends mongoose.Document{
    _doc: T
}

export interface VotesInterface extends MongoResult<VotesInterface>{
    optionId: Types.ObjectId,
    userId: Types.ObjectId,
}

const VoteSchema = new Schema<VotesInterface> ({
    optionId: { type: Schema.Types.ObjectId, required: true},
    userId: { type: Schema.Types.ObjectId, required: true},
})

export const Votes = mongoose.model<VotesInterface>('Vote', VoteSchema);