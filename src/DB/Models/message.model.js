import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
content: {
    type: String,
    minLength:1,
    required: true,
   
},
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
}
}, {timestamps: true});
const messageModel = mongoose.models.Message||mongoose.model("Message", messageSchema);
export default messageModel;