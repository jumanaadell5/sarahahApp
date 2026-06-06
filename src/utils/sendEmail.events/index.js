import eventEmitter from 'events';
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../service/sendEmail.js";
import { generateToken } from '../token/generateToken.js';


export const emailEmitter = new eventEmitter(); 

emailEmitter.on("sendEmail", async (data) => {
  const { email } = data;

  const token = generateToken(
    { email },
    process.env.SIGNATURE_CONFIRMATION,
    { expiresIn: "10m" }
  );

  const link = `http://localhost:3000/users/confirmEmail/${token}`;

  await sendEmail(email, "confirm Email", `<a href="${link}">confirm me</a>`);
});

export default emailEmitter;