import config from './config.js';
import app from './app.js';
//import cluster from 'cluster';
//import { cpus } from 'os';
import { initdb } from './db/mongodb.js';

await initdb();
  
  const PORT = config.port;
  const ENV = config.env;
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} in ${ENV} mode`);
  })


/* console.log(`PID ${process.pid}: cluster.isPrimary --> ${cluster.isPrimary}`);
if (cluster.isPrimary) {
  const cpusNum = cpus().length;

  console.log(`This is the main process, PID ${process.pid}. Available processors: ${cpusNum}`);

  for (let i = 0; i < cpusNum; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`The worker ${worker.process.pid} 💀`, code, signal);
    if (String(signal) !== 'SIGTERM') {
      cluster.fork();
    }
  })
}else {
  console.log(`This is a worker process, PID ${process.pid}`);

  await initdb();
  
  const PORT = config.port;
  const ENV = config.env;
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} in ${ENV} mode`);
  });
} */


