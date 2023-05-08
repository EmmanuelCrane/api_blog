import { Model, model, Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    password: string;
};
export interface IUserStatic extends Model<IUser> {
    comparePassword: (password: string, recivedPassword:string) => Promise<boolean>
};

const options = {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    trim: true
};

const userSchema = new Schema<IUser, Model<IUser>>({
    name: options,
    password: {
        type: String,
        require: true,
    },
});
userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

// userSchema.method('comparePassword', async function (password: string): Promise<boolean> {
//     return await bcrypt.compare(password, this.password);
// });
userSchema.static('comparePassword', async function (password: string, recivedPassword:string): Promise<boolean> {
    return await bcrypt.compare(password, recivedPassword);
});

export default model<IUser, IUserStatic>('users', userSchema);