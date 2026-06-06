import { hash } from "bcrypt";
import userModel from "../../DB/Models/user.model.js";
import {asyncHandler  , emailEmitter , Hash , compareHash , Encrypt ,decrypt , generateToken,verifyToken} from "../../utils/index.js";
import messageModel from "../../DB/Models/message.model.js";


 
export const signUp = asyncHandler(async (req, res, next) => {
    const { name, email, gender, phone, password, cPassword } = req.body;

    if (password !== cPassword) {
        return next(new Error("Password and confirm password do not match"));
    }

    const hash = await Hash({ password, SALT_ROUNDS: process.env.SALT_ROUNDS });

    const ciphertext = await Encrypt(phone);

    const user = await userModel.create({
        name,
        email,
        gender,
        phone: ciphertext,
        password: hash
    });
    emailEmitter.emit('sendEmail', { email });

    

 
    return res.status(201).json({
        msg: "Sign up successful",
        user
    });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  if (!token) {
    return next(new Error("Token is required"));
  }
const decoded = verifyToken(
  token,
  process.env.SIGNATURE_CONFIRMATION
);

if (!decoded?.email) {
  return next(new Error("Invalid token"));
}
  const user = await userModel.findOneAndUpdate(
    { email: decoded.email },
    { confirmed: true },
    { new: true }
  );

  if (!user) {
    return next(new Error("User not found"));
  }

  return res.status(200).json({
    msg: "Email confirmed successfully",
    user
  });
});

export const signIn = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email,
            confirmed: true
        });

        if (!user) {
            return next(new Error("Invalid email or not confirmed yet"));
        }

        const isMatch = await compareHash({ password, hash: user.password });

        if (!isMatch) {
            return next(new Error("Invalid email or password"));
        }

      const token = generateToken(
  { id: user._id, email: user.email },
  user.role === "admin"
    ? process.env.JWT_SECRET_Admin
    : process.env.JWT_SECRET_User,
  { expiresIn: 60 * 60 }
);
        return res.status(200).json({
            msg: "Sign in successful",
            token
        });

    } catch (err) {
        return next(new Error("Error"));
    }
});

export const getProfile = asyncHandler(async (req, res) => {

    const user = req.user;
      const Messages = await messageModel.find({userId:req.user._id})

    const phone = await decrypt(user.phone, process.env.CRYPTO_SECRET);
    return res.status(200).json({
        msg: "done",
        ...user._doc,
        phone,
        Messages
    });
});
export const updateProfile = asyncHandler(async (req, res, next) => {

  if (req.body.phone) {
    req.body.phone =await Encrypt(
      req.body.phone,
      process.env.CRYPTO_SECRET
    );
  }

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    { returnDocument: "after"}
  );

  return res.status(200).json({
    msg: "done",
    user
  });

});
export const updatePassword = asyncHandler(async (req, res, next) => {

const {oldPassword,newPassword}=req.body;

//checkPassword
if (!await compareHash({
    password: oldPassword,
    hash: req.user.password
})){
  return next(new Error("invalid old password",{cause:400}))
}
const hashp = await Hash({
    password: newPassword,
    SALT_ROUNDS: process.env.SALT_ROUNDS
})

  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {password:hashp,passwordChangedAt:Date.now()},
    { returnDocument: "after"}
  );

  return res.status(200).json({
    msg: "done",
    user
  }); 


});
export const freezeAccount= asyncHandler(async (req, res, next) => {


  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {isDeleted:true,passwordChangedAt:Date.now()},
    { returnDocument: "after"}
  );

  return res.status(200).json({
    msg: "done",
    user
  }); 
})
export const shareProfile= asyncHandler(async (req, res, next) => {


  const user = await userModel.findById(
    req.params.id
  ).select("email name phone");
  if(!user){
    return next(new Error("user not found",{cause:404}))
  }

  return res.status(200).json({
    msg: "done",
    user
  }); 
})