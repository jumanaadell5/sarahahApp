import jwt from "jsonwebtoken";
import userModel from "../DB/Models/user.model.js";
import { asyncHandler } from "../utils/error/index.js";
export const roles = {
    admin: "admin",
    user: "user"
}

export const authentication = asyncHandler(async (req, res, next) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new Error("Authorization header missing", { cause: 401 }));
  }

  const [prefix, token] = authorization.split(" ");

  if (!prefix || !token) {
    return next(new Error("Invalid token format", { cause: 401 }));
  }

  let SIGNATURE_TOKEN;

  if (prefix === "Admin") {
    SIGNATURE_TOKEN = process.env.JWT_SECRET_Admin;
  } else if (prefix === "Bearer") {
    SIGNATURE_TOKEN = process.env.JWT_SECRET_User;
  } else {
    return next(new Error("Invalid token prefix", { cause: 401 }));
  }

  const decoded = jwt.verify(token, SIGNATURE_TOKEN);

  if (!decoded?.id) {
    return next(new Error("Invalid token payload", { cause: 401 }));
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new Error("User not found", { cause: 401 }));
  }
if(parseInt(user.passwordChangedAt.getTime()/1000)>decoded.id){
  return next (new Error("token expire please login again!",{cause:401}))
}
if(user?.isDeleted){
  return next(new Error("User is deleted",{cause:401}))
}
  req.user = user;
  next();
});
export const authorization =(accessRoles =[])=>{
  return asyncHandler(async(req,res,next)=>{
    if(!accessRoles.includes(req.user.role)){
      return next(new Error("You are not authorized to access this resource", { cause: 403 }));
    }
    next();
  }
)
};