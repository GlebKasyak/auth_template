import { Reducer } from "redux";

import * as userTypes from "../types/userTypes";
import { actions } from "../actions/user.action";
import { UserState } from "../../typescript/user";
import { InferActionsTypes } from "./index";

const initialState: UserState = {
    user: {
        firstName: "",
        secondName: "",
        email: "",
        _id: "",
        createdAt: "",
        isAuth: false
    },
    token: "",
    users: [],
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const reducer: Reducer<UserState, ActionsTypes> = (state = initialState, action: ActionsTypes ): UserState => {
    switch (action.type) {
        case userTypes.LOGIN_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                    isAuth: true
                }
            };
        case userTypes.SET_USER_TOKEN:
            return { ...state, token: action.payload };
        case userTypes.LOGOUT_USER:
            return {
                ...state,
                user: {
                    ...initialState.user,
                    isAuth: false
                }
            };
        case userTypes.GET_USERS:
            return {
                ...state,
                users: [
                    ...state.users,
                    ...action.payload
                ]
            };
        default:
            return state;
    }
};

export default reducer;