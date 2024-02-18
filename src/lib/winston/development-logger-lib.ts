import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
    return `[${level}] ${timestamp} : ${message}`;
});

export const devLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
          format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
            myFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
};
