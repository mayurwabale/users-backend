import express from "express";
import{ authModel }from "../models/authModel";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken")
export const registerUser = async (req:express.Request,res:express.Response)=>{
    const {userName,email,password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw Error("user Name,email,password is mandatory");
      }
      const userPresent = await authModel.find({email})
      if(userPresent.length){
        res.status(400);
        throw Error("given email already exist");
      }
    const hashedPassword = await bcrypt.hash(password,10);
    const userCreated = await authModel.create({userName,email,password:hashedPassword})
    if(userCreated){
        res.status(200).json(`User having user name: ${userName} created succesfully`)
    }
}

export const loginUser = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw Error("email and passowrd is mandatory");
    }
    const user = await authModel.findOne({ email })
    if (user && user.password) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id
                }
            }, process.env.accesskey, { expiresIn: "1m" })
            res.status(200).json({ token })
        }
    } else {
        res.status(401);
        throw Error("email or password is not valid")
    }
}    