import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:[true,"userName is Mandatory"],
        
    },
    email:{
        type:String,
        require:[true,"Email is Mandatory"],
        unique:[true,"Email already present"]
    },
    password:{
        type:String,
        require:[true,"password is Mandatory"],
        
    }
    
},{timestamps:true});

const authModel = mongoose.model("Auth",authSchema)
export {authModel}