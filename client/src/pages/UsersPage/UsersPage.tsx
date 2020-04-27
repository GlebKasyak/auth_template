import React from "react";
import { Row }from "antd";

import { IUser } from "../../typescript/user";
import { UserCard, EmptyComponent } from "../../components";

type UsersPagePropsType = {
    users: Array<IUser>
};

const UsersPage: React.FC<UsersPagePropsType> = (
    {
        users
    }) => (
    <div className="container">
        <Row className="user-page" >
            { !!users && !!users.length
                ? users.map((user: IUser) =>
                    <UserCard user={ user } key={ user._id } /> )
                : <EmptyComponent description="Users list is empty" />
            }
        </Row>
    </div>
);

export default UsersPage;
