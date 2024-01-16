import winston from 'winston';
import config from '../config.js';

const customLevelOps = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'magenta',
    warning: 'yellow',
    info: 'blue',
    http: 'white',
    debug: 'cyan',
  },
};

const loggerProd = winston.createLogger({
  levels: customLevelOps.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOps.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: './error.log', level: 'error' }),
  ],
});

const loggerDev = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOps.colors }),
        winston.format.simple()
      ),
    })
  ]
});

export const addLogger = (req, res, next) => {
  req.logger = config.env === 'prod' ? loggerProd : loggerDev;
  next();
};
