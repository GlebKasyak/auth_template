export interface UserState {
    user: IUser,
    token: string,
    users: Array<IUser>
}

export type GetUsersDataType = {
    userId: string,
    token: string
}

export interface IUser {
    firstName: string,
    secondName: string,
    email: string,
    password?: string,
    _id: string,
    createdAt?: string,
    updatedAt?: string,
    isAuth?: boolean
}

export type LoginDataType = {
    email: string,
    password: string,
    captcha?: string
}

export type RegisterDataType = {
    firstName: string,
    secondName: string,
    email: string,
    password: string,
}


