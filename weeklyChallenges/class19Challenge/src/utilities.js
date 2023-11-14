import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
};

export const sessionSecret = '%ySKY5=n,O#7£|VG~pa2Q.4)ed4zhJ8'