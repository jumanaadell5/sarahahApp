import CryptoJS from "crypto-js";
export const decrypt=async(key, CRYPTO_SECRET=process.env.CRYPTO_SECRET)=>{
    return CryptoJS.AES.decrypt(
        key,
        CRYPTO_SECRET
    ).toString(CryptoJS.enc.Utf8);

}