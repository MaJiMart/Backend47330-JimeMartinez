import mongoose from "mongoose";

export const initdb = async () => {
    try {
        const URI = 'mongodb+srv://MaJiMart:YJbYiFYE2PehrNj3@cluster0.vxyquai.mongodb.net/ecommerce';
        await mongoose.connect(URI);

        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database connection error', error.message);
    }
};