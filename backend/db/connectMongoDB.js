import mongoose from "mongoose";


const connectMongoDB = async () => {
    try {
        const cont = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${cont.connection.host}`);
    } catch (error) {
        console.log("error in mongodb connection");
    }
}

export default connectMongoDB;