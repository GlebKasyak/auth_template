import { User } from "../models";
import { IUserDocument } from "../interfaces/userInterface";

type GetUsersProps = {
    userId: string,
    limit: number,
    page: number
}

export default class UserService {
    constructor() {}

    static login = async (email: string, password: string): Promise<string> => {
        const user = await User.findByCredentials(email, password);
        return await user.generateAuthToken();
    };

    static register = async (email: string, password: string, body: IUserDocument ): Promise<IUserDocument> => {
        const user = await User.create(body);
        if(!user) throw new Error("Error: can nit create user");

        return user;
    };

    static getUsers = async (userId: string): Promise<IUserDocument[]> =>
        await User.find({ _id: { $ne: userId } });
}

