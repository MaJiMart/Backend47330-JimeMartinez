import mongoose from "mongoose";

export const initdb = async () => {
    try {
        const URI = 'mongodb+srv://complete.vxyquai.mongodb.net/ecommercePractice';
        await mongoose.connect(URI);

        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database connection error', error.message);
    }
};