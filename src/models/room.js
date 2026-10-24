import mongoose from "mongoose";

const ROOM_TYPES = ["single","double","suite"]
const ROOM_STATUSES  = ["active","maintenance"]

const roomSchema = mongoose.Schema({
    roomNumber:{
        type:String,
        required: [true, "roomNumber is required"],
        unique:true,
        trim:true,
        minlength:[2,"roomNumber minimum length is 2"],
        maxlength:[10,"roomNumber maximum length is 10"],
        uppercase: true, match: [/^[A-Za-z0-9-]+$/, "roomNumber may contain only letters, numbers and hyphens"]
    },type:{
        type:String,
        required: [true, "type is required"],
        enum: {values:ROOM_TYPES , message:"type must be single, double or suite"}
    },capacity:{
        type:Number,
        required: [true, "capacity is required"],
        min:[1,"capacity minimum is 1"],
        max:[6,"capacity maximum is 6"],
        validate:{
            validator: Number.isInteger,
            message: "capacity must be integer"
        }
    },nightlyRate:{
        type:Number,
        required:[true , "nightly is required"],
        min:[1,"nightlyRate must be >=1"],
        validate:{
            validator: Number.isInteger,
            message: "nightlyRate must be integer"
        }
    },floor:{
        type:Number,
        required:false,
        min:[0,"floor minimum is 0"],
        max:[50,"floor maximum is 50"],
        validate:{
            validator: (value)=> value == undefined || Number.isInteger(value) ,
            message:"floor must be integer"
        }
    },amenities:{
        type:[String],
        default:[],
        validate:{
            validator:(arr)=> arr.length<=10,
            message: "amenities can contain at most 10 items"
        }
    },status:{
        type:String,
        enum:ROOM_STATUSES,
        default:ROOM_STATUSES[0]
    },
},{
  timestamps:true  
})


export const roomModel = mongoose.model('room',roomSchema);