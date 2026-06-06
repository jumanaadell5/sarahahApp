import Joi from "joi";
import { generalRules } from "../../utils/generalRules/index.js";
import { enumGender } from "../../DB/Models/user.model.js";


export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(5).required(),
            email: generalRules.email,
            password: generalRules.password,

        cPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required(),

        gender: Joi.string()
            .valid(enumGender.Male, enumGender.Female)
            .required(),

        phone: Joi.string()
            .pattern(/^01[0125][0-9]{8}$/)
            .required()
    })
        .options({
            presence: "required",
            abortEarly: false
        })
        .with("password", "cPassword").with("email", "password")

    }
    export const signInSchema = {
    body: Joi.object({
            email: generalRules.email,
            password: generalRules.password,

       
    })
    }
        export const updateProfileSchema = {
    body:Joi.object({
        name:Joi.string().alphanum().min(3).max(5),
        gender:Joi.string().valid(enumGender.Female,enumGender.Male),
        phone:Joi.string().regex(/^01[0125][0-9]{8}$/)
    }).required(),
    headers:generalRules.headers.required()

       
    }
            export const updatePasswordSchema = {
    body:Joi.object({
        oldPassword:generalRules.password.required(),
        newPassword:generalRules.password.required(),
        cPassword:generalRules.password.valid(Joi.ref('newPassword')).required()
    }),
    headers:generalRules.headers.required()

       
    }
     export const freezeAccountSchema = {
    headers:generalRules.headers.required() 
    }
             export const shareProfileSchema = {
    params:Joi.object({
        id:generalRules.id.required()

            })
        }
       