import { config } from 'dotenv';
import app from './src/app';
import connectDB from './src/db/connection';

const runServer = async () => {
    try {
        await connectDB();

        config();
        const PORT = process.env.PORT ?? 7777;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

runServer();
