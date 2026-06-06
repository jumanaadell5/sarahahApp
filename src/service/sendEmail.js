import nodemailer from 'nodemailer';
export const sendEmail = async (to, subject, html) => {
const transporter = nodemailer.createTransport({
service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
try {
  const info = await transporter.sendMail({
    from: `${process.env.SMTP_USER}`, 
    to : to? to: "jomana.albaproperties@gmail.com", 
    subject: subject ? subject: "Hello", 
    html: html ? html: "<b>Hello world?</b>", 
  });
    if(info.accepted.length > 0){
return true;
    } else {
        
        return false;
    }

}catch (err) {
  console.error("Error while sending mail:", err);
}
}