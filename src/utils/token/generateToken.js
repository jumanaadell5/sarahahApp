import jwt from "jsonwebtoken";
export const generateToken = (payload={}, SIGNATURE, option) => {
 return jwt.sign(
            payload,
            SIGNATURE,
            option
        );
    }