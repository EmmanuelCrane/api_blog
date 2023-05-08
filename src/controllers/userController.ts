import { Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User, {IUser} from "../models/user";
import confirm from '../config/config';

function createToken(user: IUser) {
    return jwt.sign({id: user.id, name: user.name}, confirm.jwtSecret);
}

export const singUp = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.name || !req.body.password) return res.status(400).json({msg:"Place. Send your email and password"});

    const user = await User.findOne({name: req.body.name});

    if(user) return res.status(400).json({msg:"This user already exists"});

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);

};
export const singIn = async (req: Request, res: Response) => {
    if(!req.body.name || !req.body.password) return res.status(400).json({msg:"Place. Send your email and password"});

    const user = await User.findOne({name: req.body.name});
    if(!user) return res.status(400).json({ msg: "The user dont not exists" });

    const isMatch = await User.comparePassword(req.body.password, user.password);

    if(isMatch) return res.status(200).json({token: createToken(user)});

    return res.status(400).json({ msg: "The user name or password are incorrect" });

};