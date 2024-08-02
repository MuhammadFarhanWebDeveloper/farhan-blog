import mongoose from "mongoose";
// mongodb+srv://MuhammadFarhan:FarhanWebDev@123@chatbackend.vpy4ba9.mongodb.net/

const connectToMongoDB = async ()=>{
    const mongoURI = process.env.MONGO_URI
    const db = await mongoose.connect(mongoURI, {dbName:"MERNBlog"})
    console.log("connected successfully")
    
}

export default connectToMongoDB;