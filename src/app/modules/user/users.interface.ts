import { Model } from "mongoose";

export interface UserWithStatic extends Model<TUser> {
    isUserExists(id: string): Promise<TUser | null>;
}

export type TUser = {
    name: string;
    email: string;
    phone: string;
    password: string
    isDeleted: boolean;
};






