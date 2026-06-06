import mongoose from "mongoose";
const connectionDB = async () => {
    await mongoose.connect(process.env.URI_ONLINE)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });
}
export default connectionDB;
