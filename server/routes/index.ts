import { Application } from "express";

import { default as userRouter } from "./user.router";

export default (app: Application) => {
    app.use("/api/user", userRouter);
};
