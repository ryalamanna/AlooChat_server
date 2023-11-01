import mongoose from 'mongoose';

export let dbInstance = undefined;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `mongodb://127.0.0.1:27017/chat_db`
        );
        dbInstance = connectionInstance;
        console.log(
            `MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
        );
        return 'yes';
    } catch (error) {
        console.log('MongoDB connection error: ', error);
        process.exit(1);
    }
};

export default connectDB;
