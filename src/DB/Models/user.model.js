import mongoose from "mongoose";
import { roles } from "../../middleware/auth.js";
export const enumGender = {
    Male:"Male",
    Female:"Female"
};


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,    
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 8,

    }
    ,
    gender: {
        type: String,
        enum: Object.values(enumGender),
        required: true
    },
    phone:{
        type: String,
        required: true

    },
    confirmed: {
        type: Boolean,
        default: false
    }   ,
    role: {
        type: String,
        enum: Object.values(roles),
        default: "user"
        },
        passwordChangedAt:Date,
        isDeleted:{
            type:Boolean,
            default:false
        }

}, {timestamps: true});
const userModel = mongoose.models.User||mongoose.model("User", userSchema);
export default userModel;