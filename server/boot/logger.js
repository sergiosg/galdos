import winston from 'winston';
import config from '../config.json';
import path from 'path';
import fs from 'fs';

console.log('Creating log...');

if (!fs.existsSync(config.logs_dir)) {
  fs.mkdirSync(config.logs_dir);
}

const file = path.join(config.logs_dir, 'galdos.log');

const logger = new winston.Logger({
  level: config.logs_level,
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      handleExceptions: true }
    ),
    new (winston.transports.File)({
      filename: file,
      timestamp: true,
      handleExceptions: true,
    }),
  ],
});

logger.exitOnError = false;

console.log('Log created sucess=', !!logger);

function getLogger() {
  return logger;
}

export {
  getLogger,
};
