import { Schema, model, Document } from 'mongoose';

// Mongo document model

const schema = new Schema({
    username: String,
    password: String,
    email: String
});


// Typescript type (interface)

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
}

export default model<IUser>('User', schema);
