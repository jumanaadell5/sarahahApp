import Joi from "joi";
import { Types } from "mongoose";

export let customId=(value, helpers)=>{
    let data= Types.ObjectId.isValid(value);
 return data? value : helpers.message("Invalid id format");

}
export const generalRules = {
    objectId: Joi.string().custom(customId),
     email: Joi.string()
                .email({
                    tlds: { allow: ["com", "net"] }
                })
                .required(),
    
            password: Joi.string()
                .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                .required(),
      id: Joi.string().hex().length(24).required(),
           
    headers: Joi.object({
        authorization: Joi.string().required(),
        'cache-control': Joi.string(),
        'postman-token': Joi.string(),
        'content-type': Joi.string(),
        'content-length': Joi.string(),
        host: Joi.string(),
        'user-agent': Joi.string(),
        accept: Joi.string(),
        'accept-encoding': Joi.string(),
        connection: Joi.string()
    })
};