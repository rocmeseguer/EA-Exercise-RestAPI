import { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    username: string;
    phone: string;
    company: {
      name: string;
    }
}

const UserSchema = new Schema <IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  phone: String,
});

export const UserModel =  model("User", UserSchema); 
