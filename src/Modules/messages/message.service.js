import messageModel from "../../DB/Models/message.model.js";
import userModel from "../../DB/Models/user.model.js";
import { asyncHandler } from "../../utils/error/index.js";

export const sendMessage=asyncHandler(async(req,res,next)=>{
    const {content,userId} = req.body;
    if(!await userModel.findOne({_id:userId,isDeleted:false} )){
        return next(new Error("User not found"))
    }
    const message = await messageModel.create({content,userId});
    return res.status(200).json({message:"done",message})

})
export const getMesages= asyncHandler(async(req,res,next)=>{
    const Messages = await messageModel.find({userId:req.user._id}).populate([
    {
        path:"userId",
        select:"email name phone"
    }
    ]);
    return res.status(201).json({message:"done",Messages})
})