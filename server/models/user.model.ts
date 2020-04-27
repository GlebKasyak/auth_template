import { Schema, model } from "mongoose";
import { NextFunction } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUserDocument, IUserModel } from "../interfaces/userInterface";

const userSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    secondName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        min: 4,
        trim: true
    }

}, {
    timestamps: true
});

userSchema.pre("save", async function(next: NextFunction) {
    const user: any = this;

    if(user.isModified("password")) {
        user.password = await hash(user.password, 15);
    }

    next();
});

userSchema.statics.findByCredentials = async (email: string, password: string): Promise<IUserDocument> => {
    const user = await User.findOne({ email }) as IUserDocument;
    if(!user) throw new Error("Incorrect data during sign in system");

    const isMatch: boolean = await compare(password, user.password);
    if(!isMatch) {
        throw new Error("Password is incorrect, please try again");
    }

    return user;
};

userSchema.methods.generateAuthToken = async function(): Promise<string> {
    const user = this;
    return sign({ userId: user._id }, "secret");
};


const User: IUserModel = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
