import bcrypt from "bcrypt";
export const compareHash =async({password , hash})=>{
    return bcrypt.compareSync(password, hash);
}
