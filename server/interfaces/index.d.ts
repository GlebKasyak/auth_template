import { IUserDocument } from "./userInterface";

declare global {
    namespace Express {
        interface Request {
            user: IUserDocument,
            token: string
        }
    }
}

export type DecodedDataType = {
    userId: string;
    iat: number;
}