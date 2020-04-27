import { ThunkAction } from "redux-thunk";

import * as userTypes from "../types/userTypes";
import { UserAPI } from "../../core/userAPI";
import { AppStateType, InferActionsTypes } from "../reducers";

import { IUser, LoginDataType, GetUsersDataType } from "../../typescript/user";

export const actions = {
    loginAC: (payload: IUser) => ({ type: userTypes.LOGIN_USER, payload } as const),
    setUserTokenAC: (payload: string) => ({ type: userTypes.SET_USER_TOKEN, payload } as const),
    logoutAC: () => ({ type: userTypes.LOGOUT_USER } as const),
    getUsersAC: (payload: Array<IUser>) => ({ type: userTypes.GET_USERS, payload } as const),
};


type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof actions>>;

export const getAuthUserData = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.me(token);
    const { success, user, token: userToken } = response.data;

    if(success) {
        dispatch(actions.setUserTokenAC(userToken!));
        dispatch(actions.loginAC(user!));
    }
};

export const login = (data: LoginDataType): ThunkActionType<any> => async dispatch => {
    try {
        const response = await UserAPI.login(data);

        const { success, token, message } = response.data;
        if(success) {
            dispatch(getAuthUserData(token!));

            return { success, message };
        }
    } catch (err) {
        return err.response.data;
    }
};

export const logout = (token: string): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.logout(token);

    const { success } = response.data;
    if(success) dispatch(actions.logoutAC());
};

export const getUsers = (data: GetUsersDataType): ThunkActionType<void> => async dispatch => {
    const response = await UserAPI.getUsers(data);

    const { success, users } = response.data;
    if(success) dispatch(actions.getUsersAC(users!));
};
