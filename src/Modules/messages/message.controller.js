import {Router} from "express";
import * as service from "./message.service.js";
import { validation } from "../../middleware/validation.js";
import { sendMessageSchema } from "./message.validation.js";
import { authentication } from "../../middleware/auth.js";
const messageRouter = Router();
messageRouter.post("/",validation(sendMessageSchema),service.sendMessage);
messageRouter.get("/",authentication,service.getMesages);

export default messageRouter;