import { Types, Schema, model } from "mongoose";

export interface ITodo {
    user: Types.ObjectId;
    name: string;
    completed: boolean
}


const TodoSchema = new Schema<ITodo>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  completed: { type: Boolean, default: false }
});

export const TodoModel =  model("Todo", TodoSchema); 