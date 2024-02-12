import config from './config.js';
import app from './app.js';
import { initdb } from './db/mongodb.js';
import { loggerDev } from './config/logger.js';

await initdb();
  
  const PORT = config.port;
  const ENV = config.env;
  
  app.listen(PORT, () => {
    loggerDev.http(`Server running on http://localhost:${PORT} in ${ENV} mode`);
  })