import mongoose from "mongoose";


export const URI = 'mongodb+srv://complete.vxyquai.mongodb.net/ecommerce';

export const initdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database error connection', error.message);
    }
};