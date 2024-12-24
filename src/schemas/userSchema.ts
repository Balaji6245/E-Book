import { Schema, Document, model, Enum } from "../helpers/path";

const options = {
    timestamps: true,
    versionkey: true
}

interface IUser extends Document {
    name: string,
    password: string,
    email: string,
    active: number
}

const requiredString = { type: String, required: true }

const userSchema = new Schema<IUser>({
    name: requiredString,
    password: requiredString,
    email: requiredString,
    active: { type: Number, default: Enum.STATUS.ACTIVE }
}, options);

export const UserModel = model<IUser>('user', userSchema);