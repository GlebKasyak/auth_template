import instance from "./api";
import { LoginDataType, RegisterDataType, GetUsersDataType } from "../typescript/user";

export class UserAPI {

    static login = (data: LoginDataType) => {
        return instance.post("/user/login", data);
    };

    static me = (token: string) =>{
        return instance.get("/user/", {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static register = (data: RegisterDataType) => {
        return instance.post("/user/", data);
    };

    static logout = (token: string) => {
        return instance.get("/user/logout", {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };

    static getUsers = ({ userId, token }: GetUsersDataType) => {
        return instance.get(`/user/all/${ userId }`, {
            headers: { Authorization: `Bearer ${ token }` }
        });
    };
}