import mongoose from "mongoose";

export const ROLES = ['admin','manager','receptionist']

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"minimum length is 3"],
        maxlength:[80,"maximum length is 80"]
    },email:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        match:[
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'
        ]
    },
    passwordHash:{
        type:String,
        required:true,
        select:false,
        // minlength:[8,'min length is 8'],
    },role:{
        type:String,
        enum:ROLES,
        required: true,
        default:ROLES[2]
    },isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

export const User = mongoose.model('user',userSchema);

