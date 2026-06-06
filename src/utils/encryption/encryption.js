import CryptoJS from "crypto-js";
export const Encrypt=async(key,CRYPTO_SECRET=process.env.CRYPTO_SECRET)=>{
    return CryptoJS.AES.encrypt(
    key, CRYPTO_SECRET
    ).toString();
}