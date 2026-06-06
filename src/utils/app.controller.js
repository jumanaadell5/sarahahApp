import connectionDB from '../DB/connectionDB.js';
import messageRouter from '../Modules/messages/message.controller.js';
import userRouter from '../Modules/users/user.controller.js';
import { globalErrorHandler } from './error/index.js';
import cors from "cors";
const bootstrap = async (app , express) => {
    app.use(cors());
    app.use(express.json())
    connectionDB();
app.get("/",(req,res,next)=>{
    return res.status(200).json({message:"Hello on saraha app"})
})
app.use("/users", userRouter);
app.use("/messages", messageRouter);
    app.use((req, res, next) => {
        return next(new Error(`Can't find this route ${req.originalUrl}`));
    });
app.use(globalErrorHandler);
}
export default bootstrap;