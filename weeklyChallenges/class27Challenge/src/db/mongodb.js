import config from '../config.js';
import mongoose from "mongoose";


export const URI = config.mongodbUri;

export const initdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected 🗄️');
    } catch (error) {
        console.error('Database error connection', error.message);
    }
};