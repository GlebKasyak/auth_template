import React, { useState, useEffect, useCallback, FC } from "react";
import { connect } from "react-redux";
import { Empty } from "antd";

import { Preloader } from "../../components";
import UsersPage from "./UsersPage";

import { AppStateType } from "../../store/reducers";
import { IUser, GetUsersDataType } from "../../typescript/user";
import { getUsers } from "../../store/actions/user.action";

type MapStateToPropsType = {
    userId: string,
    token: string,
    users: Array<IUser>,
}

type MapDispatchToPropsType = {
    getUsers: (data: GetUsersDataType) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersPageContainer: FC<PropsType> = (
    {
        getUsers,
        userId,
        token,
        users
    }) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = useCallback( async () => {
        await getUsers({ userId, token });
        setIsLoading(false);
    }, [getUsers, userId, token]);

    useEffect(() => {
        if(!!token && !!userId) fetchData();
    }, [fetchData, token, userId]);

    if(isLoading) return <Preloader text="Users are loading... Please wait!" />;
    if(!users.length) return <Empty description="User list is empty" />;

    return <UsersPage
        users={ users }
    />
};

const mapStateToProps = ({ user }: AppStateType): MapStateToPropsType => ({
    users: user.users,
    userId: user.user._id,
    token: user.token
});


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getUsers })
(UsersPageContainer);