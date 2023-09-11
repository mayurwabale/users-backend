import express from "express";
import { User, userInf } from "../models/usersModel";
/*
@desc : used to get all users details
@route : GET /api/users
 */
export const getUsers = async(req:express.Request,res:express.Response)=>{
    const data = await User.find();
    console.log(200);
    res.status(200).json(data);
}

export const getUserById = async(req:express.Request,res:express.Response)=>{
    const user = await User.findOne({_id:req.params.id});
    res.status(200).json(user);
}
/*
@desc : used to create new user
@route : POST /api/users
 */
export const createUser = async(req:express.Request,res:express.Response)=>{
  const user = req.body;
  const {name,email,phone}= req.body;
  if(!name || !email || !phone){
    res.status(400);
    console.log("name,email,phone is mandatory");
  }
  const savedUser = await User.create({name,email,phone});
  res.status(200).json(savedUser);
}

/*
@desc : used to update user
@route : PUT /api/users/
 */
export const updateUser = async (req:express.Request,res:express.Response)=>{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
    if(updatedUser){
        console.log(200);
        res.status(200).json({message:`User of Id:${req.params.id} and Name:${req.body.name} updated succesfuly` });
    }else{
        res.status(500).json({message:`update failed for User:${req.body.name}` });
    } 
}

/*
@desc : used to delete user
@route : DELETE /api/users/:id
 */
export const deleteUser = async (req:express.Request,res:express.Response)=>{
    const findUser = await User.findByIdAndDelete({_id:req.params.id});
    if(findUser){
        res.status(200).json({message:`user of name:${findUser.name} deleted succesfully`});
    }else{
        res.status(500).json({message:`Delete failed for ID:${req.params.id}` });
    }
    
}

