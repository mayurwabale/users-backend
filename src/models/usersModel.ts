import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add User name"]
    },
    email:{
        type:String,
        required:[true,"Please add User email"] 
    },
    phone:{
        type:String,
        required:[true,"Please add User phone number"]
    }
},{timestamps:true})
 export interface userInf{
    name:string,
    email:string,
    phone:string,
    _id?:string
}
const User =  mongoose.model("Users", userSchema);
export {User}
