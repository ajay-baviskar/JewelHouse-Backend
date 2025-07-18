// utils/logger.js

const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error', // You can use 'info' or 'debug' for general logging
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/error.log') })
  ]
});

module.exports = logger;
