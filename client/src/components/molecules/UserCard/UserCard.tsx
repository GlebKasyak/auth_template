import React from "react";
import { Avatar, Card, Col } from "antd";
import icons from "./../../../shared/icons";

//@ts-ignore
import defaultAvatar from "../../../images/default_avatar.png";

import "./style.scss";

import { IUser } from "../../../typescript/user";

type UserCardPropsType = {
    user: IUser
};

const UserCard: React.FC<UserCardPropsType> = ({ user }) => (
    <Col xs={24} sm={12} lg={8} className="user-card" >
        <Card
            className="user-card__card"
            actions={[
                <icons.SettingOutlined key="setting" />,
            ]}
        >
            <Card.Meta
                avatar={ <Avatar src={ defaultAvatar } /> }
                title={ `${ user.firstName } ${ user.secondName }` }
                description={ user.email }
            />
        </Card>
    </Col>
);

export default UserCard;