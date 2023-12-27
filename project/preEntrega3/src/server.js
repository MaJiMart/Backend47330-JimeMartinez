import config from './config.js';
import app from './app.js';
import { initdb } from './db/mongodb.js'

await initdb();

const PORT = config.port;
const ENV = config.env;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} in ${ENV} mode`);
});


