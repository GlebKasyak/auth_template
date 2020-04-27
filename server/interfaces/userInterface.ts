import { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
    firstName: string,
    secondName: string,
    email: string,
    password: string,

    generateAuthToken(): Promise<string>
}

export interface IUserModel extends Model<IUserDocument>{
    findByCredentials(email: string, password: string): Promise<IUserDocument>
}
