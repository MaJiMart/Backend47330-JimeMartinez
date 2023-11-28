import mongoose from "mongoose";


export const URI = 'mongodb+srv://MaJiMart:YJbYiFYE2PehrNj3@cluster0.vxyquai.mongodb.net/ecommerce';

export const initdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database error connection', error.message);
    }
};