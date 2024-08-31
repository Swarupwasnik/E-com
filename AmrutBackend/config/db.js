import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database: ${conn.connection.host}`.bgGreen.black);
    } catch (err) {
        console.log(`Error in MongoDB: ${err.message}`.bgRed.white);
    }
};

export default connectDB;
