import { config } from 'dotenv';
import app from './src/app';

config();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
