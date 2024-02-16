import config from '../config/config.js';
import mongoose from "mongoose";
import { loggerDev } from '../config/logger.js';


export const URI = config.mongodbUri;

export const initdb = async () => {
    try {
        await mongoose.connect(URI);
        loggerDev.info('Database connected 🗄️');
    } catch (error) {
        loggerDev.error('Database error connection', error.message);
    }
};