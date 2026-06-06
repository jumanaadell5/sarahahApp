import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env") });
import express from 'express';
import nodemailer from 'nodemailer';
import bootstrap from './src/utils/app.controller.js';
 const app = express()
 const port = process.env.PORT || 3000;

 bootstrap(app , express)
 export default app;