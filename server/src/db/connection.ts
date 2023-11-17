import mongodb from 'mongoose';

const connectDB = async () => {
    try {
        const DATABASE_URL = process.env.DATABASE_URL ?? 'localhost:27017';
        const DATABASE_NAME = process.env.DATABASE_NAME ?? 'tictactoe';

        await mongodb.connect(`mongodb://${DATABASE_URL}/${DATABASE_NAME}`, {});

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
