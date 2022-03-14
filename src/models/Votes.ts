import {Types, Schema} from "mongoose";

export interface Votes {
    optionId: Types.ObjectId,
    userId: Types.ObjectId,
}

const VoteSchema = new Schema ({
    optionId: { type: Types.ObjectId, required: true},
    userId: { type: Types.ObjectId, required: true},
})