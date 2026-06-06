import bcrypt from "bcrypt";
export const Hash =async({password , SALT_ROUNDS=process.env.SALT_ROUNDS})=>{
    return bcrypt.hashSync(password, parseInt(SALT_ROUNDS));
}
